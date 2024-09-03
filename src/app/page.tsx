import Introduction from '../components/Introduction';
import FieldsOfInterest from '../components/FieldsOfInterest';
import Projects from '../components/Project';
import RecentPosts from '../components/RecentPost';
import Footer from '../components/Footer';

const Home: React.FC = () => (
  <div className="min-h-screen bg-black">
    <Introduction />
    <FieldsOfInterest />
    <Projects />
    <RecentPosts />
    <Footer />
  </div>
);

export default Home;
