import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Aligners from '../pages/Aligners';
import Pricing from '../pages/Pricing';
import WhyLinea from '../pages/WhyLinea';
import FAQ from '../pages/FAQ';
import Results from '../pages/Results';
import GetStarted from '../pages/GetStarted';
import Story from '../pages/Story';
import BeforeAfter from '../pages/BeforeAfter';
import Timeline from '../pages/Timeline';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Contact from '../pages/Contact';
import ForDentists from '../pages/ForDentists';
import Login from '../pages/Login';
import PasswordReset from '../pages/PasswordReset';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/aligners" element={<Aligners />} />
        <Route path="/aligners/pricing" element={<Pricing />} />
        <Route path="/aligners/why" element={<WhyLinea />} />
        <Route path="/aligners/faq" element={<FAQ />} />
        <Route path="/aligners/results" element={<Results />} />
        <Route path="/aligners/quiz" element={<GetStarted />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/about" element={<Story />} />
        <Route path="/our-story" element={<Story />} />
        <Route path="/before-afters" element={<BeforeAfter />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partners" element={<ForDentists />} />
        <Route path="/for-dentists" element={<ForDentists />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password_reset" element={<PasswordReset />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

