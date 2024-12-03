import {BrowserRouter, Routes, Route} from "react-router-dom"

import DisplayLevels from './pages/selectLevelPage';
import ModulesPage from './pages/modulesPage';
import ChaptersPage from './pages/chaptersPage';
import QuizPage from './pages/quizPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path ='/' element= {<DisplayLevels />} />
        <Route path="/modules/:studyLevel" element={<ModulesPage />} />
        <Route path="/chapters/:module_id" element={<ChaptersPage />} />
        <Route path="/quiz/:question_id" element={<QuizPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
