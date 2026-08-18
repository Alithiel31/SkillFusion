import { describe, it } from 'node:test';
import assert from 'node:assert';
import type { Response, NextFunction } from 'express';
import { requireSelfOrAdmin, ROLES } from './rbac.middleware';
import { generateAuthTokens } from '../lib/token';
import { generateFakeUser } from '../../test/index';
import type { AuthenticatedRequest } from '../@types/express';

function buildMockReq(
    user: ReturnType<typeof generateFakeUser>,
    resourceId: number
): AuthenticatedRequest {
    const { accessToken } = generateAuthTokens(user);
    return {
        headers: { authorization: `Bearer ${accessToken.token}` },
        params: { id: String(resourceId) },
    } as unknown as AuthenticatedRequest;
}

describe('requireSelfOrAdmin', () => {
    it("allows an admin to access another user's resource", () => {
        // ARRANGE
        const admin = generateFakeUser({ roleId: ROLES.ADMIN });
        const req = buildMockReq(admin, admin.id + 1);
        let nextCalled = false;

        // ACT
        requireSelfOrAdmin(
            req,
            {} as Response,
            (() => {
                nextCalled = true;
            }) as NextFunction
        );

        // ASSERT
        assert.strictEqual(nextCalled, true);
    });

    it("rejects a non-admin accessing another user's resource", () => {
        // ARRANGE
        const student = generateFakeUser({ roleId: ROLES.STUDENT });
        const req = buildMockReq(student, student.id + 1);

        // ACT & ASSERT
        assert.throws(() => {
            requireSelfOrAdmin(req, {} as Response, () => {});
        }, /Vous ne pouvez modifier/);
    });
});
