import React, { useMemo, useEffect, useState, useRef } from 'react';
import './ScrollList.css';
import Row from './Row/Row';
import { throttle } from 'lodash';

function ScrollList(props) {
    // 1. calculate total number of rows
    const totalCount = useMemo(() => (props.list || []).length, [ props.list ]);
    // 2. calulate total scroll height
    const scrollHeight = useMemo(() => totalCount * props.itemHeight, [ totalCount, props.itemHeight ]);
    const outerParent = useRef(null);
    const scrollParent = useRef(null);
    const [ maxVisibleRowsCount, setMaxVisibleRowsCount ] = useState(0);
    const [ visibleRows, setVisibleRows ] = useState([]);
    const [ scrollTop, setScrollTop ] = useState(0);
    const [ isUpdateInProgress, setIsUpdateInProgress ] = useState(false);
    const [ visibleRowsIndexRange, setVisibleRowsIndexRange ] = useState([0, 0]);
    const scrollParentOffset = useRef(null);

    const resizeListener = () => {
        scrollParentOffset.current = outerParent.current.getBoundingClientRect();
    }

    useEffect(() => {
        console.log('resize -- effect');
        scrollParentOffset.current = outerParent.current.getBoundingClientRect();
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    useEffect(() => {
        console.log('setMaxVisibleRowsCount -- effect');
        // 3. get height of main container element (outer parent)
        const outerParentOffset = outerParent.current.getBoundingClientRect();
        console.log(outerParentOffset);
        // 4. calculate max visile rows (multiply by 3 (upper buffer + visible + lower buffer))
        const maxVisibleRowsCount = Math.max(Math.ceil(outerParentOffset.height / props.itemHeight), 4) * 3
        setMaxVisibleRowsCount(Math.min(maxVisibleRowsCount, props.list.length));
    }, [props.itemHeight, props.list.length]);

    useEffect(() => {
        console.log('setVisibleRowsIndexRange -- effect');
        setVisibleRowsIndexRange([0, maxVisibleRowsCount]);
    }, [ maxVisibleRowsCount ]);

    useEffect(() => {
        console.log('setVisibleRows -- effect');
        console.log('visibleRowsIndexRange--', visibleRowsIndexRange);
        // console.log('data slice---', props.list.slice(...visibleRowsIndexRange));
        const rowElements = props.list.slice(...visibleRowsIndexRange).map((row, index) => {
            return (
                <Row
                    data={row}
                    columns={props.columns}
                    index={index + visibleRowsIndexRange[0]}
                    height={props.itemHeight}
                    key={row.id}
                    onRowClick={props.onRowClick}
                    onSelectionChange={props.onSelectionChange}
                />
            );
        });
        setVisibleRows(rowElements);
    }, [props.columns, props.itemHeight, props.list, props.onRowClick, props.onSelectionChange, visibleRowsIndexRange]);

    useEffect(() => {
        setScrollTop(outerParent.current.scrollTop);
        window.setTimeout(() => {
            setIsUpdateInProgress(false);
        }, 220);
    }, [ visibleRows ]);

    const getAdjustedRange = (range) => {
        let newRange = range.slice(0);
        if (newRange[0] < 0) {
            newRange[0] = 0;
            newRange[1] = maxVisibleRowsCount;
        } else if (newRange[1] >= props.list.length) {
            newRange[0] = props.list.length - maxVisibleRowsCount;
            newRange[1] = props.list.length;
        }
        return newRange;
    }

    const adjustRange = (scrollDirection) => {
        let index1 = visibleRowsIndexRange[0];
        let index2 = visibleRowsIndexRange[1];
        const visibleRowsCount = maxVisibleRowsCount / 3;
        console.log('visibleRowsCount --', visibleRowsCount);
        if (scrollDirection === 'down') {
            index1 += visibleRowsCount;
            index2 += visibleRowsCount;
        } else {
            index1 -= visibleRowsCount;
            index2 -= visibleRowsCount;
        }
        
        [index1, index2] = getAdjustedRange([index1, index2]);
        // index1 = Math.max(index1, 0);
        // index2 = Math.min(index2, props.list.length - 1);
        console.log('scrollDirection--', scrollDirection);
        console.log('setVisibleRowsIndexRange--', [index1, index2]);
        setIsUpdateInProgress(true);
        setVisibleRowsIndexRange([index1, index2]);
    }

    

    const caluculateNewRange = (element1, element2, nearEnd, farEnd, scrollDirection) => {
        // const element2 = scrollParentOffset.current;
        const diff = element1[farEnd] - element2[farEnd];
        let newRange = 0; 
        const visibleRowsCount = maxVisibleRowsCount / 3;
        if (element1[farEnd] > element2[farEnd]){
            // remove visibleRowsCount on one side and visibleRowsCount on the other
            if (diff < props.itemHeight * 5) {
                console.log('case1');
                adjustRange(scrollDirection);
            }
        } else if (element1[nearEnd] < element2[nearEnd]) {
            // messTxt = "Last element went up the viewport and the list blank now. Calculate range by scroll height divided by row height. this is case 3";
            console.log('case3');
            // console.log(rowElement);
            // console.log(element2);
            newRange = Math.round(outerParent.current.scrollTop / props.itemHeight);
            // console.log('newRange---', newRange);
            setIsUpdateInProgress(true);
            setVisibleRowsIndexRange(getAdjustedRange([newRange - visibleRowsCount, newRange + visibleRowsCount]));
            // messTxt += " New Range is " + (newRange - visibleRowsCount)  + " - " + (newRange + visibleRowsCount);
        } else {
            // messTxt = "Last element is in the viewport and there will be some gap in the bottom.  Render next range here. This is case2";
            console.log('case2');
            adjustRange(scrollDirection);
        }
    }

    const getElementClientRect = (index) => {
        const currentScrollTop = outerParent.current.scrollTop;
        const top = visibleRowsIndexRange[index] * props.itemHeight - currentScrollTop;
        const elemClientRect = {
            top,
            bottom: top + props.itemHeight,
        };
        return elemClientRect;
    }

    const scrollHandler = throttle((event) => {
        // console.log('scrollhanlder');
        if (isUpdateInProgress) return;
        const currentScrollTop = outerParent.current.scrollTop;
        // console.log('scrollTop--', scrollTop);
        // console.log('currentScrollTop--', currentScrollTop);
        if (scrollTop < currentScrollTop) {
            // scrolling down - check last element
            const lastRowElemClientRect = getElementClientRect(1);
            // console.log('lastRowElemClientRect---', lastRowElemClientRect);
            caluculateNewRange(lastRowElemClientRect, scrollParentOffset.current, 'top', 'bottom', 'down');
        } else {
            // scrolling up - check first element
            const firstRowElemClientRect = getElementClientRect(0);
            // console.log('firstRowElemClientRect---', firstRowElemClientRect);
            caluculateNewRange(scrollParentOffset.current, firstRowElemClientRect, 'bottom', 'top', 'up');
        }
        setScrollTop(currentScrollTop);
    }, 50);

    const scrollParentStyle = {
        height: scrollHeight + 'px',
    };

    return (
        <div
            ref={outerParent}
            className="custom-scroll-list"
            onScroll={scrollHandler}
        >
            <div
                ref={scrollParent}
                className="custom-scroll-container"
                style={scrollParentStyle}
            >
                { visibleRows }
            </div>
        </div> 
    );
}

export default ScrollList;
