import Logo from "@components/Logo";
import MarkPicker from "@components/MarkPicker";
import Button from "@components/Button";

export default function Menu() {
  return (
    <div className="max-w-game-window w-game-window m mobile:gap-y-10 mx-auto grid gap-y-8 text-center">
      <Logo className="mx-auto" />
      <MarkPicker />

      <ul className="mobile:gap-y-5 grid gap-y-4">
        <li className="grid">
          <Button color="yellow" className="rounded-2xl py-6">
            NEW GAME (VS CPU)
          </Button>
        </li>
        <li className="grid">
          <Button color="blue" className="rounded-2xl py-6">
            NEW GAME (VS PLAYER)
          </Button>
        </li>
      </ul>
    </div>
  );
}
