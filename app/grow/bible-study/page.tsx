import { redirect } from "next/navigation";

// This used to be a small-group finder/registration page, but it only ever
// showed fabricated demo groups ("Demo Leader", "Room 101") -- we don't
// actually run small groups. Our real scripture study happens in the
// Bible/Book of Mormon/D&C study app, so send visitors there instead.
export default function BibleStudyRedirect() {
  redirect("https://mplscc.org");
}
