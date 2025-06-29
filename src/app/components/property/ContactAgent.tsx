"use client";

import { useState } from 'react';
import type { Property } from '@/app/services/PropertyService';
import { contact, company } from '@/app/data/site-data';
import { IoCallOutline, IoMailOutline, IoLocationOutline } from 'react-icons/io5';

interface ContactAgentProps {
  property: Property;
}

export function ContactAgent({ property }: ContactAgentProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in ${property.title} at ${property.location}. Please contact me with more information.`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: `I'm interested in ${property.title} at ${property.location}. Please contact me with more information.`,
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="sticky top-8 space-y-6">
      {/* Agent Contact Card */}
      <div className="card bg-base-100 shadow-lg border border-base-200">
        <div className="card-body">
          <div className="text-center mb-4">
            <div className="avatar placeholder mb-3">
              <div className="bg-primary text-primary-content rounded-full w-16">
                <span className="text-2xl">{company.icon}</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold">{company.name}</h3>
            <p className="text-sm text-base-content/70">{company.tagline}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <IoCallOutline className="w-5 h-5 text-primary" />
              <a href={`tel:${contact.phone}`} className="link link-hover">
                {contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <IoMailOutline className="w-5 h-5 text-primary" />
              <a href={`mailto:${contact.email}`} className="link link-hover">
                {contact.email}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <IoLocationOutline className="w-5 h-5 text-primary mt-0.5" />
              <div className="text-sm text-base-content/80">
                {contact.address.street}<br />
                {contact.address.suite}<br />
                {contact.address.city}, {contact.address.state} {contact.address.zip}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="card bg-base-100 shadow-lg border border-base-200">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4">Get More Information</h3>
          
          {submitStatus === 'success' && (
            <div className="alert alert-success mb-4">
              <span>Thank you! We'll contact you soon.</span>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="alert alert-error mb-4">
              <span>Something went wrong. Please try again.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Name *</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email *</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="textarea textarea-bordered w-full h-24"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-lg border border-base-200">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="btn btn-outline w-full">
              Schedule a Tour
            </button>
            <button className="btn btn-outline w-full">
              Save to Favorites
            </button>
            <button className="btn btn-outline w-full">
              Share Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
