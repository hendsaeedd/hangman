const HEAD = (
  <div
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "100%",
      border: "8px solid black",
      position: "absolute",
      top: "40px",
      right: "-20px",
    }}
  />
)

const BODY = (
  <div
    style={{
      width: "8px",
      height: "80px",
      background: "black",
      position: "absolute",
      top: "90px",
      right: 0,
    }}
  />
)

const RIGHT_ARM = (
  <div
    style={{
      width: "70px",
      height: "8px",
      background: "black",
      position: "absolute",
      top: "130px",
      right: "-60px",
      rotate: "-30deg",
      transformOrigin: "left bottom",
    }}
  />
)

const LEFT_ARM = (
  <div
    style={{
      width: "70px",
      height: "8px",
      background: "black",
      position: "absolute",
      top: "130px",
      right: "0px",
      rotate: "30deg",
      transformOrigin: "right bottom",
    }}
  />
)

const RIGHT_LEG = (
  <div
    style={{
      width: "80px",
      height: "8px",
      background: "black",
      position: "absolute",
      top: "160px",
      right: "-70px",
      rotate: "60deg",
      transformOrigin: "left bottom",
    }}
  />
)

const LEFT_LEG = (
  <div
    style={{
      width: "80px",
      height: "8px",
      background: "black",
      position: "absolute",
      top: "160px",
      right: 0,
      rotate: "-60deg",
      transformOrigin: "right bottom",
    }}
  />
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmanDrawingProps = {
  numberOfGuesses: number
}

export default function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div style={{ position: "relative" }}>
      {BODY_PARTS.slice(0, numberOfGuesses)}

      <div className="sm:h-12 sm:w-2 h-10 w-2 bg-black absolute top-0 right-0 "/>
      <div className="sm:h-2 sm:w-60 w-40 h-2 bg-black ml-40 sm:ml-40"/>
      <div className="sm:h-60 sm:w-2 h-60 w-2 bg-black ml-40 sm:ml-40"/>
      <div className="sm:h-2 sm:w-70 w-60 h-2 bg-black"/>
    </div>
  );
}
