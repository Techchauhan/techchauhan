import Introduction from '../components/Introduction';
import FieldsOfInterest from '../components/FieldsOfInterest';
import Projects from '../components/Project';
import RecentPosts from '../components/RecentPost';
import Footer from '../components/Footer';
import Meteors from '@/components/ui/meteors';
import IconCloud from '@/components/ui/icon-cloud';

const Home: React.FC = () => {
  // Define the list of icon slugs for IconCloud
  const iconSlugs = [
    'react',        // React logo
    'javascript',   // JavaScript logo
    'typescript',   // TypeScript logo
    'node-dot-js',  // Node.js logo
    'html5',        // HTML5 logo
    'css3',         // CSS3 logo
    'flutter',      // Flutter logo
    'firebase',     // Firebase logo
    'next-dot-js',  // Next.js logo
    'github',       // GitHub logo
    'jenkins',      // Jenkins logo
    'kubernetes',   // Kubernetes logo
    'jira',         // Jira logo
    'aws',          // AWS logo
    'postgresql',   // PostgreSQL logo
    'bigquery',     // BigQuery logo
    'googlecloud',  // Google Cloud logo
    'java',         // Java logo
    'python',       // Python logo
    'docker',       // Docker logo
    'androidstudio',// Android Studio logo
    'android',      // Android logo
    'dart',         // Dart logo
  ];

  return (
    <div className="min-h-screen bg-black">
      <Introduction />
      <FieldsOfInterest />
      <Projects />
      <Meteors />
     
      <RecentPosts />
      <Footer />
    </div>
  );
};

export default Home;
