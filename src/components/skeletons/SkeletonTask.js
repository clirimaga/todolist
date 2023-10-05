import React from "react";
import SkeletonElement from "./SkeletonElement";
import "./Skeleton.css";
import Shimmer from "./Shimmer";

export default function SkeletonTask() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-task">
        <SkeletonElement type="checkbox" />
        <SkeletonElement type="text" />
        <SkeletonElement type="button" />
        <SkeletonElement type="button" />
      </div>
      <Shimmer />
    </div>
  );
}
