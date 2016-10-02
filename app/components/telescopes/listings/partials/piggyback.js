import React, { Component } from 'react';
import { Link } from 'react-router';

export default function piggyback() {
  return (
    <Link className="btn piggyback" to="">
      Piggyback on Mission
    </Link>
  );
}
