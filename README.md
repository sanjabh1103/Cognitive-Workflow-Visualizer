# NeuroFlow Designer - AI-Powered Cognitive Workflow Visualizer

NeuroFlow Designer is the world's first "Cognitive Operating System" - a comprehensive platform that enhances human decision-making through AI-powered workflow visualization, collective intelligence, emotional mapping, and temporal impact modeling.

## 🧠 What This Application Can Do

### Core Features Implemented

#### 1. **AI-Powered Decision Analysis**
- Natural language processing of complex decisions
- Cognitive bias detection and analysis
- Complexity scoring (1-10 scale)
- Stakeholder identification and mapping
- Constraint analysis (temporal, financial, social, personal)
- Missing information identification

#### 2. **Interactive Visual Workflows**
- Dynamic decision tree visualization
- Interactive node-based workflow editor
- Multiple decision path exploration
- Risk assessment visualization
- Outcome probability modeling

#### 3. **Intelligent Decision Creation**
- Step-by-step guided decision input
- Real-time AI analysis and insights
- Structured decision framework generation
- Automated workflow creation

#### 4. **User Management & Gamification**
- Secure authentication with Supabase Auth
- User profiles with points and levels
- Achievement badges system
- Decision tracking and history

#### 5. **Responsive Design**
- Mobile-first responsive interface
- Modern glassmorphism UI design
- Smooth animations and micro-interactions
- Accessibility-focused components

### AI Integration (Gemini)

The application integrates with Google's Gemini AI to provide:
- **Decision Analysis**: Breaks down complex decisions into structured components
- **Cognitive Bias Detection**: Identifies potential biases in decision framing
- **Outcome Prediction**: Forecasts potential results with confidence levels
- **Risk Assessment**: Analyzes multiple risk categories and mitigation strategies
- **Values Alignment**: Maps decisions to personal values and life vision

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database and auth)
- Google AI Studio account (for Gemini API)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd neuroflow-designer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_APP_URL=http://localhost:5173
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the migration file: `supabase/migrations/001_initial_schema.sql`
   - This creates all necessary tables with Row Level Security (RLS) enabled

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── decision/       # Decision-specific components
│   ├── features/       # Feature showcase components
│   ├── layout/         # Layout and navigation
│   ├── ui/            # Base UI components
│   └── workflow/      # Workflow visualization
├── hooks/             # Custom React hooks
├── lib/               # External service integrations
├── pages/             # Route components
└── types/             # TypeScript type definitions
```

### Backend Architecture (Supabase)
```
Database Tables:
├── profiles           # User profiles and preferences
├── decisions          # Core decision records
├── decision_paths     # Possible decision paths
├── predicted_outcomes # AI-generated predictions
├── actual_outcomes    # User-reported results
├── workflows          # Visual workflow data
├── collaborations     # Collaboration settings
├── expert_profiles    # Expert network data
├── user_emotions      # Emotional assessments
├── user_values        # Values mapping
├── risk_assessments   # Risk analysis data
├── contingency_plans  # Backup scenarios
└── gamification       # Points and achievements
```

### AI Integration Flow
```
User Input → Gemini AI Analysis → Structured Data → Database Storage → UI Visualization
```

## 📊 Database Schema Details

### Key Tables

#### `decisions`
- Stores core decision information
- Links to user profiles via `user_id`
- Contains AI analysis results (complexity, biases, etc.)
- Tracks decision status (draft, in_progress, completed)

#### `decision_paths`
- Represents different options for each decision
- Contains probability assessments and impact ratings
- Links risk factors and success enablers

#### `predicted_outcomes` & `actual_outcomes`
- Stores AI predictions vs real-world results
- Enables learning and model improvement
- Tracks satisfaction scores and lessons learned

#### `workflows`
- Stores visual workflow data (nodes, edges, layout)
- Enables interactive decision tree visualization
- Supports collaborative editing

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Secure authentication via Supabase Auth
- API keys stored securely in environment variables

## 🎯 User Stories Implemented

### Epic 1: Core Decision Workflow Creation ✅
- **US-001**: Decision Input & Context Analysis
- **US-002**: Visual Workflow Generation  
- **US-003**: AI Outcome Prediction

### Epic 2: User Management & Authentication ✅
- User registration and login
- Profile management with gamification
- Secure session management

### Epic 3: AI Integration ✅
- Gemini AI service integration
- Decision analysis with system prompts
- Fallback to mock data when API unavailable

## 🔄 Pending Features

The following high-priority features are ready for implementation:

### High Priority
1. **Real-time Collaborative Workflows** (US-012)
2. **Advanced Outcome Tracking** (US-017)
3. **Expert Network Connection** (US-005)

### Medium Priority
4. **Temporal Impact Modeling** (US-008, US-009)
5. **Risk Management Suite** (US-010, US-011)
6. **External Data Integration** (US-013)
7. **Collective Intelligence** (US-004)

### Additional Features
8. **Emotional Intelligence Layer** (US-006, US-007)
9. **Mobile Optimization** (US-016)
10. **Advanced Customization** (US-014, US-015)

## 🛠️ Development Guidelines

### Code Organization
- **Modular Architecture**: Each feature is self-contained
- **TypeScript**: Full type safety throughout
- **Component Separation**: UI components are reusable and composable
- **Custom Hooks**: Business logic separated from UI components

### API Integration
- **Gemini AI**: Handles all AI analysis and predictions
- **Supabase**: Manages database operations and real-time features
- **Error Handling**: Graceful fallbacks when services are unavailable

### Performance
- **Lazy Loading**: Components loaded on demand
- **Caching**: API responses cached locally
- **Optimistic Updates**: UI updates immediately, syncs in background

## 🔐 Security Considerations

- Environment variables for sensitive data
- Row Level Security on all database tables
- Input validation and sanitization
- Secure authentication flows
- API rate limiting considerations

## 📱 Mobile Support

- Responsive design works on all screen sizes
- Touch-optimized interactions
- Offline capability with local storage
- Progressive Web App (PWA) ready

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set environment variables in deployment settings
3. Deploy automatically on push to main branch

### Supabase Setup
1. Create project at supabase.com
2. Run database migrations
3. Configure authentication providers
4. Set up Row Level Security policies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the documentation
2. Review existing GitHub issues
3. Create a new issue with detailed description

---

**NeuroFlow Designer** - Transforming decision-making through AI-powered cognitive workflows.