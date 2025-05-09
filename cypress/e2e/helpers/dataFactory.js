function withOverrides(defaults, overrides = {}) {
  return { ...defaults, ...overrides };
}

const firstNames = ['Carlos', 'Ana', 'Luis', 'Sofía', 'Juan', 'Camila', 'Andrés', 'Laura', 'David', 'Valentina'];
const lastNames = ['Pérez', 'Gómez', 'Rodríguez', 'López', 'Martínez', 'Hernández', 'Díaz', 'Morales', 'Ruiz', 'Castro'];

function randomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function generateRandomPhone() {
  return `3${Math.floor(100000000 + Math.random() * 900000000)}`;
}

function generateRandomFirstName() {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function generateRandomLastName() {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

export function generateRandomUser(overrides = {}) {
  return withOverrides({
    email: `user_${Date.now()}@example.com`,
    password: 'Test@1234',
    username: `user_${randomString(8)}`,
    first_name: generateRandomFirstName(),
    last_name: generateRandomLastName(),
    phone: generateRandomPhone(),
  }, overrides);
}

export function generateRandomCategory(overrides = {}) {
  return withOverrides({
    name: `category_${Date.now()}_${randomString(4)}`,
  }, overrides);
}

export function generateRandomSubcategory(overrides = {}) {
  return withOverrides({
    name: `subcategory_${Date.now()}_${randomString(4)}`,
  }, overrides);
}
