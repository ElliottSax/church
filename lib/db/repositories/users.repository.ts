/**
 * Users Repository
 *
 * Centralized data access layer for user management
 * All user-related database operations go through this repository
 */

import { prisma } from '../client';
import type { User, Prisma } from '@prisma/client';

export class UsersRepository {
  /**
   * Get all users with optional filters
   */
  async findAll(filters?: {
    role?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: Prisma.UserWhereInput = {};

    if (filters?.role) {
      where.role = filters.role;
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: filters?.limit,
        skip: filters?.offset,
        include: {
          _count: {
            select: {
              rsvps: true,
              prayerRequests: true,
              donations: true,
              volunteerSignups: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  /**
   * Get user by ID
   */
  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            rsvps: true,
            prayerRequests: true,
            donations: true,
            volunteerSignups: true,
          },
        },
      },
    });
  }

  /**
   * Get user by email
   */
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Create new user
   */
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    });
  }

  /**
   * Update user
   */
  async update(id: string, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Update user role
   */
  async updateRole(id: string, role: string) {
    return await prisma.user.update({
      where: { id },
      data: { role },
    });
  }

  /**
   * Delete user (soft delete - can be extended)
   */
  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }

  /**
   * Get user statistics
   */
  async getStats() {
    const [totalUsers, roleStats, recentUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.groupBy({
        by: ['role'],
        _count: true,
        orderBy: {
          _count: {
            role: 'desc',
          },
        },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      totalUsers,
      byRole: roleStats.map((stat) => ({
        role: stat.role,
        count: stat._count,
      })),
      recentUsers,
    };
  }

  /**
   * Search users by name or email
   */
  async search(query: string, limit: number = 10) {
    return await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });
  }
}

// Export singleton instance
export const usersRepository = new UsersRepository();
