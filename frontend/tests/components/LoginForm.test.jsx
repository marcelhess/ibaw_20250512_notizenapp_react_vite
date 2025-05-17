import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../src/contexts/AuthContext';
import LoginForm from '../../src/components/auth/LoginForm';

const mockLogin = jest.fn(async () => ({ token: 'abc', user: { email: 'test@test.de' } }));

const renderWithContext = () =>
  render(
    <AuthContext.Provider value={{ login: mockLogin }}>
      <LoginForm />
    </AuthContext.Provider>
  );

describe('LoginForm', () => {
  it('renders and submits login', async () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText(/E-Mail/i), { target: { value: 'test@test.de' } });
    fireEvent.change(screen.getByLabelText(/Passwort/i), { target: { value: 'test1234' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(mockLogin).toHaveBeenCalledWith('test@test.de', 'test1234');
  });
}); 