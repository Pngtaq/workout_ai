# 🏋️‍♂️ Workout AI

An AI-powered fitness application that generates personalized workout plans using artificial intelligence. Built with Next.js 15, TypeScript, and MongoDB.

![Workout AI](https://img.shields.io/badge/Next.js-15.4.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6.18-green?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)

## ✨ Features

### 🤖 AI-Powered Workout Generation
- **Personalized Plans**: Generate workouts tailored to your equipment, fitness level, and goals
- **Cohere AI Integration**: Advanced AI model for intelligent workout recommendations
- **Real-time Generation**: Instant workout plan creation with typing animation
- **Multiple Prompts**: Create and save multiple workout variations

### 📊 User Management
- **Google OAuth**: Secure authentication with Google
- **Profile Management**: Complete user profiles with BMI calculation
- **Progress Tracking**: Monitor your fitness journey
- **Workout History**: Save and access previous workout plans

### 🎯 Smart Features
- **Local Storage Caching**: Persistent data across sessions
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth user experience with loading indicators

### 🏃‍♀️ Workout Management
- **Daily Workouts**: Detailed daily exercise routines
- **Warm-up & Cool-down**: Complete workout structure
- **Diet Recommendations**: AI-generated nutrition tips
- **Progress Overview**: Track days per week, duration, and focus areas

## 🏗️ Architecture

### Frontend
- **Next.js 15**: App Router with TypeScript
- **React 19**: Latest React features and hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Query**: Server state management and caching
- **React Hook Form**: Form handling and validation

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database with Mongoose ODM
- **NextAuth.js**: Authentication and session management
- **Cohere AI**: Advanced AI model for workout generation

### Key Libraries
- `@tanstack/react-query`: Data fetching and caching
- `react-hot-toast`: Toast notifications
- `typewriter-effect`: Typing animations
- `framer-motion`: Animations and transitions
- `mongoose`: MongoDB object modeling

## 📁 Project Structure

```
workout/
├── app/                          # Next.js App Router
│   ├── (pages)/                   # Route groups
│   │   ├── about/                 # About page
│   │   ├── createWorkout/         # AI workout generation
│   │   ├── dashboard/             # User dashboard
│   │   ├── login/                 # Authentication
│   │   ├── myWorkout/             # Saved workouts
│   │   ├── settings/             # User settings
│   │   └── updateProfile/         # Profile management
│   ├── api/                       # API routes
│   │   ├── auth/                  # Authentication endpoints
│   │   ├── cohereAI/              # AI workout generation
│   │   ├── createWorkout/         # Workout management
│   │   ├── user/                  # User management
│   │   └── workout/               # Workout data
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   └── providers.tsx              # React Query provider
├── components/                    # Reusable components
│   ├── ui/                        # UI components
│   │   ├── CreateWorkoutForm.tsx  # Workout form
│   │   ├── Navigation.tsx         # Side navigation
│   │   ├── Timer.tsx              # Workout timer
│   │   └── ...                    # Other UI components
│   └── auth/                      # Authentication components
├── hooks/                         # Custom React hooks
│   ├── userHooks.ts              # User data management
│   └── workoutHooks.ts           # Workout data management
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── db.ts                     # Database connection
│   └── performance.ts            # Performance monitoring
├── schemas/                      # Database schemas
│   ├── User.ts                   # User model
│   └── workout.ts                # Workout model
├── types/                        # TypeScript types
├── public/                       # Static assets
└── middleware.js                 # Route protection
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Google OAuth credentials
- Cohere AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd workout
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Authentication
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   
   # AI Integration
   COHERE_API_KEY=your_cohere_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Database Setup
The application uses MongoDB with Mongoose for data modeling. The main schema includes:

- **User Profile**: Personal information, BMI calculation
- **Workout Plans**: AI-generated exercise routines
- **Diet Tips**: Nutrition recommendations
- **Progress Tracking**: Fitness metrics and goals

### Authentication
- **Google OAuth**: Primary authentication method
- **Session Management**: NextAuth.js handles sessions
- **Route Protection**: Middleware protects private routes

### AI Integration
- **Cohere AI**: Generates personalized workout plans
- **Prompt Engineering**: Structured prompts for consistent results
- **Response Parsing**: JSON parsing with error handling

## 📱 Pages & Features

### 🏠 Landing Page (`/`)
- Hero section with animated features
- Feature cards highlighting AI capabilities
- Call-to-action for getting started

### 📊 Dashboard (`/dashboard`)
- User profile overview with BMI calculation
- Workout summary and progress tracking
- Fitness dashboard with clock and timer components

### 🤖 Create Workout (`/createWorkout`)
- AI-powered workout generation
- Real-time typing animation
- Local storage caching for persistence
- Toast notifications for user feedback
- Save functionality with state management

### 💪 My Workout (`/myWorkout`)
- Display saved workout plans
- Daily workout breakdowns
- Diet recommendations
- Animated sections with Framer Motion

### ⚙️ Settings (`/settings`)
- User profile management
- BMI calculation updates
- Personal information editing

## 🔌 API Endpoints

### Authentication
- `GET/POST /api/auth/*` - NextAuth.js authentication

### User Management
- `GET /api/user` - Get user profile
- `POST /api/user` - Create new user
- `PATCH /api/user` - Update user profile

### Workout Management
- `GET /api/workout` - Get saved workout
- `PATCH /api/workout` - Save workout plan
- `GET /api/createWorkout` - Legacy workout endpoint
- `PATCH /api/createWorkout` - Legacy save endpoint

### AI Integration
- `POST /api/cohereAI` - Generate workout with AI

## 🎨 UI Components

### Core Components
- **Navigation**: Side navigation with user profile
- **CreateWorkoutForm**: AI workout generation form
- **Timer/Clock**: Fitness tracking components
- **InfoRow/OverviewItem**: Data display components

### Features
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: Consistent color scheme
- **Animations**: Smooth transitions and micro-interactions
- **Loading States**: User feedback during operations

## 🔒 Security & Performance

### Security Features
- **Authentication**: Google OAuth with NextAuth.js
- **Route Protection**: Middleware for private routes
- **Input Validation**: Form validation and sanitization
- **Error Handling**: Comprehensive error management

### Performance Optimizations
- **Database Indexing**: Optimized MongoDB queries
- **Connection Pooling**: Efficient database connections
- **React Query Caching**: Client-side data caching
- **Local Storage**: Persistent client-side data
- **Code Splitting**: Automatic Next.js optimization

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **React Query**: Data fetching best practices

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: Amazing React framework
- **Cohere AI**: Powerful AI capabilities
- **MongoDB**: Robust database solution
- **NextAuth.js**: Secure authentication
- **Tailwind CSS**: Utility-first styling

## 📞 Support

For support, email support@workoutai.com or create an issue in this repository.

---

**Built with ❤️ using Next.js, TypeScript, and AI**
