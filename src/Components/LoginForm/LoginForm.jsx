import { useState } from 'react';
import { useLoginMutation } from '@/store/api';
import { useSelector } from 'react-redux';

export function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [login, { isLoading, error }] = useLoginMutation();
  const user = useSelector((s) => s.auth.user);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(form).unwrap();
  };

  if (user) return <div>👋 Hi, {user.email}</div>;

  return (
    <form onSubmit={onSubmit}>
      <input name="email" value={form.email} onChange={onChange} />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
      />
      {error && <p>{error.data?.message || 'Error'}</p>}
      <button disabled={isLoading}>{isLoading ? '...' : 'Login'}</button>
    </form>
  );
}
