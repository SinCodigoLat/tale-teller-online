
import React from "react";
import Layout from "@/components/layout/Layout";
import StoryForm from "@/components/stories/StoryForm";

const CreatePage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Crea una nueva historia</h1>
        <StoryForm />
      </div>
    </Layout>
  );
};

export default CreatePage;
