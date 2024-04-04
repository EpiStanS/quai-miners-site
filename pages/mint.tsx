import BaseLayout from '@/components/layouts/BaseLayout';
import { Header, Content } from '@/components/pages/mint';

const Home = () => {
  return (
    <BaseLayout>
      <Header />
      <Content />
    </BaseLayout>
  );
};

export default Home;
