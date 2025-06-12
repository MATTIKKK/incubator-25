import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

type LoginFormData = yup.InferType<typeof schema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.username, data.password);
    navigate('/');
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back!</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register('username')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-sm text-purple-600 hover:text-purple-500"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </form>
    </div>
  );
};
