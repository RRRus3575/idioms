// components/SignUpForm.jsx
import { useState } from 'react';
import Link from 'next/link';
import { useRegisterMutation } from '@/store/api';

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    acceptTerms: false,
    acceptMarketing: false,
  });
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setLocalError('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
    console.log('acceptTerms at submit:', form.acceptTerms);
  if (!form.acceptTerms) {
    setLocalError('You must agree with Terms and Privacy Policy.');
    return;
  }
  if (!form.password || form.password.length < 6) {
    setLocalError('Password should be at least 6 characters long.');
    return;
  }

  try {
    await register({
      name: form.name,
      email: form.email,
      password: form.password,
      acceptTerms: form.acceptTerms,      // 👈 ОБЯЗАТЕЛЬНОЕ
      acceptMarketing: form.acceptMarketing, // 👈 ОПЦИОНАЛЬНОЕ
    }).unwrap();
  } catch {
    /* ошибки покажет error */
  }
};


  const apiError =
    error?.data?.message || error?.data?.error || error?.error || '';

  return (
    <div className="signup-wrapper">
      <div className="signup-left">
        <h1 className="signup-title">Sign up to:</h1>
        <ul className="signup-benefits">
          <li>Save idioms you like</li>
          <li>Mark idioms as outdated</li>
          <li>Add idioms on the platform</li>
        </ul>
      </div>

      <div className="signup-right">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-field">
            <label htmlFor="name">Your name*</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="password">Password*</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="signup-checkbox">
            <label>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={form.acceptTerms}
                onChange={handleChange}
              />
              <span>
                I agree with Idiomo&apos;s{' '}
                <Link href="/terms" className="link">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="link">
                  Privacy Policy
                </Link>
                <span className="required">*</span>
              </span>
            </label>
            <p className="signup-note">
              By creating an account, you confirm that you are 16+ and have read
              our Privacy Policy.
            </p>
          </div>

          <div className="signup-checkbox">
            <label>
              <input
                type="checkbox"
                name="acceptMarketing"
                checked={form.acceptMarketing}
                onChange={handleChange}
              />
              <span>I agree to receive occasional updates from Idiomo.</span>
            </label>
          </div>

          {(localError || apiError) && (
            <p className="signup-error">{localError || apiError}</p>
          )}

          {isSuccess && (
            <p className="signup-success">
              Registration successful. Please check your email to confirm your
              account.
            </p>
          )}

          <button
            type="submit"
            className="signup-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>

          <p className="signup-login">
            I already have an account.{' '}
            <Link href="/login" className="link">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
