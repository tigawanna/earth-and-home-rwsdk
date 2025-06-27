'use client';

import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // TODO: Implement newsletter signup API call
      console.log('Newsletter signup:', email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmail('');
      // TODO: Show success message
    } catch (error) {
      console.error('Newsletter signup error:', error);
      // TODO: Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input 
        type="email" 
        placeholder="Your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-sm flex-1"
        required
      />
      <button 
        type="submit"
        className="btn btn-primary btn-sm"
        disabled={isLoading}
      >
        {isLoading ? '...' : 'Subscribe'}
      </button>
    </form>
  );
}
