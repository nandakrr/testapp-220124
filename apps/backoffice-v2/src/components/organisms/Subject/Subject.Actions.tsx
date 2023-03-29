import { FunctionComponent } from 'react';
import { Avatar } from '@/components/atoms/Avatar';
import { IActionsProps } from '@/components/organisms/Subject/interfaces';
import { EllipsisButton } from '@/components/atoms/EllipsisButton/EllipsisButton';
import { useActions } from '@/components/organisms/Subject/hooks/useActions/useActions';
import { motion } from 'framer-motion';
import * as HoverCard from '@radix-ui/react-hover-card';
import { ctw } from '@/utils/ctw/ctw';
import { DropdownMenu } from '@/components/molecules/DropdownMenu/DropdownMenu';
import { DropdownMenuTrigger } from '@/components/molecules/DropdownMenu/DropdownMenu.Trigger';
import { DropdownMenuContent } from '@/components/molecules/DropdownMenu/DropdownMenu.Content';
import { DropdownMenuSeparator } from '@/components/molecules/DropdownMenu/DropdownMenu.Separator';
import { DropdownMenuLabel } from '@/components/molecules/DropdownMenu/DropdownMenu.Label';
import { DropdownMenuItem } from '@/components/molecules/DropdownMenu/DropdownMenu.Item';
import { DropdownMenuShortcut } from '@/components/molecules/DropdownMenu/DropDownMenu.Shortcut';
import { Action } from '@/enums';
import { Dialog } from '@/components/organisms/Dialog/Dialog';
import { DialogFooter } from '@/components/organisms/Dialog/Dialog.Footer';
import { DialogContent } from '@/components/organisms/Dialog/Dialog.Content';
import { DialogTrigger } from '@/components/organisms/Dialog/Dialog.Trigger';
import { DialogTitle } from '@/components/organisms/Dialog/Dialog.Title';
import { DialogDescription } from '@/components/organisms/Dialog/Dialog.Description';
import { DialogHeader } from '@/components/organisms/Dialog/Dialog.Header';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/atoms/Button';
import { Loader2 } from 'lucide-react';

/**
 * @description To be used by {@link Subject}. Displays the end user's full name, avatar, and handles the reject/approve mutation.
 *
 * @param props
 * @param props.id - The id of the end user, passed into the reject/approve mutation.
 * @param props.fullName - The full name of the end user.
 * @param props.avatarUrl - The end user's image url to pass into {@link Avatar}.
 *
 * @see {@link Subject}
 * @see {@link Avatar}
 *
 * @constructor
 */
export const Actions: FunctionComponent<IActionsProps> = ({ id, fullName, avatarUrl }) => {
  const {
    onMutateApproveEndUser,
    onMutateRejectEndUser,
    debouncedIsLoadingApproveEndUser,
    debouncedIsLoadingRejectEndUser,
    isLoading,
    isLoadingEndUser,
    initials,
    canApprove,
    canReject,
    resubmissionReason,
    onResubmissionReasonChange,
  } = useActions({ endUserId: id, fullName });

  return (
    <div className={`sticky top-0 z-50 col-span-2 bg-base-100 px-4`}>
      <div className={`flex h-[7.75rem] justify-between pl-10`}>
        <motion.div
          // Animate when the user changes.
          key={id}
          className={`flex items-center space-x-8`}
          initial={{
            opacity: 0,
            x: '-50px',
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <Avatar
            src={avatarUrl}
            placeholder={!avatarUrl ? initials : undefined}
            alt={`${fullName}'s profile`}
            className={`h-16 w-16`}
            isLoading={isLoadingEndUser}
          />
          <h2
            className={ctw(`text-2xl`, {
              'h-8 w-[24ch] animate-pulse rounded-md bg-gray-200 theme-dark:bg-neutral-focus':
                isLoadingEndUser,
            })}
          >
            {fullName}
          </h2>
        </motion.div>
        <div className={`flex items-center space-x-6`}>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={`default`}
                  size={'lg'}
                  className={`bg-error text-error-content`}
                  disabled={isLoading || !canReject}
                >
                  {debouncedIsLoadingRejectEndUser && <Loader2 className="me-2 animate-spin d-4" />}
                  Reject
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={`min-w-[16rem]`} align={`end`}>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={`cursor-pointer`}
                  onClick={onMutateRejectEndUser({
                    action: Action.REJECT,
                  })}
                >
                  Reject
                  <DropdownMenuShortcut>Ctrl + J</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem className={`cursor-pointer`}>
                    Re-submit Document
                    <DropdownMenuShortcut>Ctrl + R</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request document re-submission</DialogTitle>
                <DialogDescription>
                  State the reason for requesting a document re-submission.
                </DialogDescription>
              </DialogHeader>
              <div className={`border-neutral/10 p-4 theme-dark:border-neutral/60`}>
                <label htmlFor="rejectReason" className="label">
                  <span className="label-text">Re-submission Reason</span>
                </label>
                <div className="form-control mb-2 rounded-md border border-neutral/10 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary theme-dark:border-neutral/60">
                  <div className={'input-group'}>
                    <input
                      type="text"
                      className="input input-md w-full !border-0 !outline-none !ring-0 placeholder:text-base-content"
                      onChange={onResubmissionReasonChange}
                      value={resubmissionReason}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant={`default`}
                    className={`bg-error text-error-content`}
                    onClick={onMutateRejectEndUser({
                      action: Action.RESUBMIT,
                      resubmissionReason,
                    })}
                    disabled={!resubmissionReason}
                  >
                    Confirm
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <HoverCard.Root openDelay={0} closeDelay={0}>
            <HoverCard.Trigger asChild>
              <Button
                variant={`default`}
                size={'lg'}
                className={`bg-success text-success-content`}
                disabled={isLoading || !canApprove}
                onClick={onMutateApproveEndUser}
              >
                {debouncedIsLoadingApproveEndUser && <Loader2 className="me-2 animate-spin d-4" />}
                Approve
              </Button>
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content
                className={`card-compact card mt-2 rounded-md border-neutral/10 bg-base-100 p-2 shadow theme-dark:border-neutral/50`}
              >
                <div className={`flex items-center space-x-2`}>
                  <kbd className="kbd">Ctrl</kbd>
                  <span>+</span>
                  <kbd className="kbd">A</kbd>
                </div>
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
          <div className="dropdown-hover dropdown-bottom dropdown-end dropdown">
            <EllipsisButton tabIndex={0} />
            <ul
              className={`dropdown-content menu h-72 w-48 space-y-2 rounded-md border border-neutral/10 bg-base-100 p-2 theme-dark:border-neutral/60`}
            >
              <li className={`disabled`}>
                <Button variant={`ghost`} disabled>
                  Coming Soon
                </Button>
              </li>
              <li className={`disabled`}>
                <Button variant={`ghost`} disabled>
                  Coming Soon
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`divider my-0 w-full`}></div>
    </div>
  );
};
