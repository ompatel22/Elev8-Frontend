import HackathonCard from "./HackathonCard";
import { useState, useEffect } from "react";
const HackathonList = ({ setHackathons, filteredHackathons, setFilteredHackathons }) => {

    const fetchHackathons = async () => {
        const response = await fetch("http://localhost:8080/api/hackathons");
        const data = await response.json();
        setHackathons(data);
        setFilteredHackathons(data);
    }

    useEffect(() => {
        fetchHackathons();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHackathons.map((hackathon, index) => (
            <HackathonCard key={index} {...hackathon} />
          ))}
        </div>
      )
}

export default HackathonList;