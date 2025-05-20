export function randomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export function generateRandomUser(overrides = {}) {
  return {
    email: `user_${randomString(8)}@example.com`,
    password: 'Test@1234',
    username: randomString(10),
    first_name: randomString(8),
    last_name: randomString(8),
    phone: `3${Math.floor(100000000 + Math.random() * 900000000)}`,
    ...overrides
  };
}