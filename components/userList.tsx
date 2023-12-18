"user client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { translate } from "@/lib/dictionary";
interface User {
    id: string;
    firstName: string;
    lastName: string;
    createdAt: any;
  }
export default function UsersList(props: { userList: User[],lang:"en" | "jp"}) {
  let i = 1;
  return (
    <div>
      <Table className="">
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>{translate('user_page.name',props.lang)}</TableHead>
            <TableHead>{translate('user_page.email',props.lang)}</TableHead>
            <TableHead className="text-right">{translate('user_page.created_at',props.lang)}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.userList?.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{i++}</TableCell>
              <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell className="text-right">{new Date(item.createdAt).toISOString()}</TableCell>
              {/* <TableCell className="text-right">{item.createdAt}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
