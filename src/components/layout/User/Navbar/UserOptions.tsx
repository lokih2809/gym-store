import { User } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import LogOutButton from "@/components/Account/LogOutButton";

const UserOptions = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector((state: RootState) => state.session.user);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {user ? (
        <div>
          <Tooltip title="User Options" arrow>
            <IconButton onClick={handleClick}>
              <User color="black" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {user.role === "ADMIN" && (
              <MenuItem onClick={handleClose}>
                <Link href="/dashboard">Admin</Link>
              </MenuItem>
            )}
            <MenuItem onClick={handleClose}>
              <Link href="/account">Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <LogOutButton />
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <IconButton onClick={() => router.push("/login")}>
          <User color="black" />
        </IconButton>
      )}
    </>
  );
};

export default UserOptions;
