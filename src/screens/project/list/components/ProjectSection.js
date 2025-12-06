import React from "react";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

export default function ProjectSection({ title, data, type, onPressCard, onPurchasePress, currentUser }) {
  return (
    <>
      <SectionHeader title={title} buttonText="전체보기 →" type={type} />
      {data.map((item) => (
        <ProjectCard
          key={item.id}
          project={item}
          onPress={() => onPressCard(item)}
          onPurchasePress={() => onPurchasePress(item)}
          isOwner={currentUser?.id === item.ownerId}
        />
      ))}
    </>
  );
}
