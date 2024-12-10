import { QuizGrid } from '../components/quiz/QuizGrid';
import { QuizSection } from '../components/quiz/QuizSection';
import { Clock, Sparkles, Trophy, BookOpen, Target } from 'lucide-react';
import { useQuizzes } from '../hooks/useQuizzes';
import { useParams } from 'react-router-dom';
export const QuizzesPage : React.FC = () => {
  const params = useParams<{ id: string, year: string, subjectId: string,chapterId:string }>();
  const {
    inProgressQuizzes,
    newQuizzes,
    completedQuizzes,
    stats,
  } = useQuizzes(params.chapterId!);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Learning Journey</h1>
              <p className="text-lg text-gray-600">Track your progress and master new skills</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                  <div className="text-xl font-semibold text-gray-900">{stats.completionRate}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Total Quizzes</div>
                  <div className="text-xl font-semibold text-gray-900">
                    {inProgressQuizzes.length + newQuizzes.length + completedQuizzes.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Sections */}
        <div className="space-y-16">
          {inProgressQuizzes.length > 0 && (
            <QuizSection
              title="Continue Learning"
              description="Pick up where you left off"
            >
              <div className="flex items-center gap-2 mb-6 text-blue-600 bg-blue-50 px-4 py-2 rounded-lg inline-block">
                <Clock size={20} />
                <span className="text-sm font-medium">{inProgressQuizzes.length} quizzes in progress</span>
              </div>
              <QuizGrid quizzes={inProgressQuizzes} />
            </QuizSection>
          )}

          {newQuizzes.length > 0 && (
            <QuizSection
              title="Start Something New"
              description="Fresh challenges await you"
            >
              <div className="flex items-center gap-2 mb-6 text-purple-600 bg-purple-50 px-4 py-2 rounded-lg inline-block">
                <Sparkles size={20} />
                <span className="text-sm font-medium">{newQuizzes.length} new quizzes available</span>
              </div>
              <QuizGrid quizzes={newQuizzes} />
            </QuizSection>
          )}

          {completedQuizzes.length > 0 && (
            <QuizSection
              title="Completed Quizzes"
              description="Celebrate your achievements"
            >
              <div className="flex items-center gap-2 mb-6 text-green-600 bg-green-50 px-4 py-2 rounded-lg inline-block">
                <Trophy size={20} />
                <span className="text-sm font-medium">{completedQuizzes.length} quizzes mastered</span>
              </div>
              <QuizGrid quizzes={completedQuizzes} variant="completed" />
            </QuizSection>
          )}

          {inProgressQuizzes.length === 0 && 
           newQuizzes.length === 0 && 
           completedQuizzes.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <div className="max-w-md mx-auto">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Quizzes Available</h3>
                <p className="text-gray-500">Check back later for new learning opportunities.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};