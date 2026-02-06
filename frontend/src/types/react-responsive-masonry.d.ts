declare module 'react-responsive-masonry' {
    import * as React from 'react';

    export interface MasonryProps {
        children?: React.ReactNode;
        columnsCount?: number;
        gutter?: string;
    }

    export interface ResponsiveMasonryProps {
        children?: React.ReactNode;
        columnsCountBreakPoints?: { [key: number]: number };
    }

    export default class Masonry extends React.Component<MasonryProps> { }
    export class ResponsiveMasonry extends React.Component<ResponsiveMasonryProps> { }
}
