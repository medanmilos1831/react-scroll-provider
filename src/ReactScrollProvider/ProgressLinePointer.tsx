const ProgressLinePointer = ({
  parallaxProgres,
}: {
  parallaxProgres: number;
}) => {
  return (
    <div
      style={{
        background: 'white',
        position: 'absolute',
        left: 0,
        top: `${parallaxProgres * 100}%`,
        transform: `translateX(100%)`,
        height: '2px',
        width: '5rem',
      }}
    >
      <div
        style={{
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '1rem',
            transform: 'translateX(100%)',
          }}
        >
          <span
            style={{
              color: 'green',
              fontSize: '3rem',
              fontWeight: 900,
            }}
          >
            {parallaxProgres}
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProgressLinePointer };
