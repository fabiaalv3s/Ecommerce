import { ProductRepository } from '../repositories/ProductRepository';
import { UserInteractionRepository } from '../repositories/UserInteractionRepository';
import { Product } from '../models/Product';

export class RecommendationService {
  private productRepository: ProductRepository;
  private interactionRepository: UserInteractionRepository;

  constructor() {
    this.productRepository = new ProductRepository();
    this.interactionRepository = new UserInteractionRepository();
  }

  /**
   * Collaborative Filtering based recommendation
   * Recommends products based on user's interaction history
   */
  async getRecommendationsForUser(userId: number, limit: number = 10): Promise<Product[]> {
    // Get user's interaction history
    const userInteractions = await this.interactionRepository.findByUserId(userId);

    if (userInteractions.length === 0) {
      // If no interactions, return popular products
      return this.getPopularProducts(limit);
    }

    // Get products user has interacted with
    const interactedProductIds = new Set(
      userInteractions.map((interaction) => interaction.product_id)
    );

    // Get categories of products user interacted with
    const userProducts = await Promise.all(
      Array.from(interactedProductIds).map((id) => this.productRepository.findById(id))
    );
    const categories = new Set(
      userProducts.filter((p) => p).map((p) => p!.category)
    );

    // Find similar products (same category, not already interacted)
    const allProducts = await this.productRepository.findAll();
    const recommendations = allProducts
      .filter(
        (product) =>
          !interactedProductIds.has(product.id!) &&
          categories.has(product.category) &&
          product.stock > 0
      )
      .sort((a, b) => {
        // Score based on category match and price
        const aScore = this.calculateProductScore(a, userInteractions);
        const bScore = this.calculateProductScore(b, userInteractions);
        return bScore - aScore;
      })
      .slice(0, limit);

    // If not enough recommendations, add popular products
    if (recommendations.length < limit) {
      const popular = await this.getPopularProducts(limit - recommendations.length);
      const popularFiltered = popular.filter(
        (p) => !interactedProductIds.has(p.id!) && !recommendations.find((r) => r.id === p.id)
      );
      recommendations.push(...popularFiltered);
    }

    return recommendations;
  }

  /**
   * Content-based recommendation
   * Recommends products similar to a given product
   */
  async getSimilarProducts(productId: number, limit: number = 5): Promise<Product[]> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return [];
    }

    const allProducts = await this.productRepository.findAll();
    return allProducts
      .filter((p) => p.id !== productId && p.category === product.category && p.stock > 0)
      .sort((a, b) => {
        // Sort by price similarity
        const aDiff = Math.abs(a.price - product.price);
        const bDiff = Math.abs(b.price - product.price);
        return aDiff - bDiff;
      })
      .slice(0, limit);
  }

  /**
   * Get popular products based on interaction count
   */
  private async getPopularProducts(limit: number): Promise<Product[]> {
    const allProducts = await this.productRepository.findAll();
    const productInteractions = await Promise.all(
      allProducts.map(async (product) => {
        const interactions = await this.interactionRepository.findByProductId(product.id!);
        return {
          product,
          interactionCount: interactions.length,
        };
      })
    );

    return productInteractions
      .filter((pi) => pi.product.stock > 0)
      .sort((a, b) => b.interactionCount - a.interactionCount)
      .slice(0, limit)
      .map((pi) => pi.product);
  }

  /**
   * Calculate product recommendation score
   */
  private calculateProductScore(
    product: Product,
    userInteractions: any[]
  ): number {
    let score = 0;

    // Base score from interactions
    const purchaseCount = userInteractions.filter(
      (i) => i.interaction_type === 'purchase'
    ).length;
    score += purchaseCount * 10;

    // Category match bonus
    const categoryInteractions = userInteractions.filter(
      (i) => i.product_id === product.id
    );
    score += categoryInteractions.length * 5;

    // Price attractiveness (lower price = higher score for budget-conscious users)
    score += Math.max(0, 100 - product.price) * 0.1;

    return score;
  }
}


