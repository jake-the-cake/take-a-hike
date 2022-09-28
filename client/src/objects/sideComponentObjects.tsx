import { FindAHikeWidget } from "../components/side-components/FindAHikeWidget/FindAHikeWidget";

type SideComponentProps = {
    Element: () => JSX.Element,
    title: string
}

export const findAHikeWidget: SideComponentProps = {
  Element: FindAHikeWidget,
  title: 'find a hike'
}