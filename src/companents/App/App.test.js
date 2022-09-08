import { render, screen } from '@testing-library/react';
import Header from '../Header/Header';
import App from './App';

test('renders learn react link', () => {
  render(<Header />);
  const linkElement = screen.getByText(/CheckUp/i);
  expect(linkElement).toBeInTheDocument();
});
