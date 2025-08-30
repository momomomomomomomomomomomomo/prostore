import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex gap-4">
      <Button variant="link">Ghost Button</Button>
      <Button variant="ghost" disabled>
        Disabled
      </Button>
    </div>
  );
};

export default HomePage;
