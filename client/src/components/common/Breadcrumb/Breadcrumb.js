import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => {
          const separator = index < items.length - 1 ? ' > ' : '';
          return (
            <li key={index} className="breadcrumb-item">
              {typeof item.link === 'undefined' ? (
                <span className="text-muted">{item.label}</span>
              ) : (
                <Link to={item.link} className="text-dark">{item.label}</Link>
              )}
              {separator}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
