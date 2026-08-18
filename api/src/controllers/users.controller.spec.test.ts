import { describe, it } from 'node:test';
import assert from 'node:assert';
import { prisma } from '../models/client';
import { buildAuthedRequester } from '../../test/index';
import { ROLES } from '../middlewares/rbac.middleware';

describe('PATCH /users/:id — role escalation', () => {
    it('should reject a roleId change from a non-admin user updating their own profile', async () => {
        // ARRANGE
        const user = await prisma.user.create({
            data: {
                firstname: 'Eve',
                lastname: 'Hacker',
                email: 'eve.hacker@skillfusion.io',
                password: 'hashedpassword',
                pseudo: 'evehacker',
                roleId: ROLES.STUDENT,
            },
        });
        const requester = buildAuthedRequester(user);

        // ACT
        const httpResponse = await requester.patch(`/api/users/${user.id}`, {
            roleId: ROLES.ADMIN,
        });

        // ASSERT
        assert.strictEqual(httpResponse.status, 403);
        const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
        assert.strictEqual(updatedUser?.roleId, ROLES.STUDENT);
    });
});
