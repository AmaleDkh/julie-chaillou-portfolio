"use client";

// Components
import Layout from "../../src/app/components/Layout/Layout";
import PhotosList from "../../src/app/components/PhotosList/PhotosList";

// Style
import "../../assets/style/Global.scss";
import "./Photos.scss";

function Photos() {
  return (
    <Layout>
      <div className="photos-portfolio">
        <PhotosList />
      </div>
    </Layout>
  );
}

export default Photos;
