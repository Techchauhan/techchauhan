import Introduction from '../components/Introduction';
import FieldsOfInterest from '../components/FieldsOfInterest';
import Projects from '../components/Project';
import RecentPosts from '../components/RecentPost';
import Footer from '../components/Footer';
import Meteors from '@/components/ui/meteors';
import IconCloud from '@/components/ui/icon-cloud';
import { MarqueeDemo } from '@/components/ui/marquee';


const Home: React.FC = () => {
  // Define the list of icon slugs for IconCloud
 
  return (
    <div className="min-h-screen bg-black">
      <Introduction />
      <FieldsOfInterest />
      <Projects />
      <RecentPosts/>
      <Footer />
    </div>
  );
};

export default Home;
