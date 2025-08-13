type WorkoutProps = {
  cooldown: [string];
  day: string;
  mainWorkout: [string];
  warmup: [string];
};
const Workout = ({ cooldown, day, mainWorkout, warmup }: WorkoutProps) => {
  return (
    <div>
      <h1>{day}</h1>
      <p>
        {warmup.map((data, i) => (
          <span key={i}>{data}</span>
        ))}
      </p>
      <p>
        {mainWorkout.map((data, i) => (
          <span key={i}>{data}</span>
        ))}
      </p>
      <p>
        {cooldown.map((data, i) => (
          <span key={i}>{data}</span>
        ))}
      </p>
    </div>
  );
};

export default Workout;
