import { jwtDecode } from 'jwt-decode';

const MOCK_JWT_SECRET = 'your-secret-key';
const MOCK_USER = {
  email: 'admin@example.com',
  password: 'admin123',
};

export async function loginUser(email: string, password: string) {
  // Mock API call
  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    // Create a mock JWT token
    const token = `mock.${btoa(JSON.stringify({ 
      id: '1',
      email: MOCK_USER.email,
      name: 'Admin User',
      role: 'super_admin'
    }))}.signature`;

    localStorage.setItem('token', token);
    return {
      user: {
        id: '1',
        email: MOCK_USER.email,
        name: 'Admin User',
        role: 'super_admin' as const
      },
      token
    };
  }
  throw new Error('Invalid credentials');
}

export function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    // Decode and verify the token
    const decoded = jwtDecode(token);
    return !!decoded;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem('token');
}