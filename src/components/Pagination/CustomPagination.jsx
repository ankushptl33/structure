import React from 'react';

const CustomPagination = props => {
    return (
        <div className='CustomPagination'>
            <ul className='Custom--pagination__ul'>
                <ListItem {...props} />
            </ul>
        </div>
    );
};

const ListItem = props => {
    const PAGERDATA = Object.assign({}, props, {
        PAGEINDEX: Number(props.PAGEINDEX || 1),
        PAGESIZE: Number(props.PAGESIZE || 5),
        PAGERCOUNT: Number(props.PAGERCOUNT || 5),
        TOTALRECORD: Number(props.TOTALRECORD || 0),
        PAGERTEXT: 'Records'
    });

    PAGERDATA.PAGERCOUNT =
        PAGERDATA.PAGERCOUNT % 2 === 0 ? PAGERDATA.PAGERCOUNT - 1 : PAGERDATA.PAGERCOUNT;
    PAGERDATA.TOTALPAGE = Math.ceil(props.TOTALRECORD / props.PAGESIZE);

    const listItems = [];
    listItems.push(
        <li key={-5} className='custom--pagination__li'>
            <span className='CustomPaginationText'>
                {PAGERDATA.PAGERTEXT +
                    ' ' +
                    (PAGERDATA.TOTALRECORD == 0
                        ? '0'
                        : fnFormatedNumber((PAGERDATA.PAGEINDEX - 1) * PAGERDATA.PAGESIZE + 1)) +
                    '-' +
                    fnFormatedNumber(
                        PAGERDATA.PAGEINDEX * PAGERDATA.PAGESIZE > PAGERDATA.TOTALRECORD
                            ? PAGERDATA.TOTALRECORD
                            : PAGERDATA.PAGEINDEX * PAGERDATA.PAGESIZE
                    ) +
                    ' of ' +
                    fnFormatedNumber(PAGERDATA.TOTALRECORD)}
            </span>
        </li>
    );

    if (PAGERDATA.PAGEINDEX === 1) {
        listItems.push(
            <li key={-2}>
                <span className='custom--pagination--back'>⟪</span>
            </li>
        );
        listItems.push(
            <li key={-1}>
                <span className='custom--pagination--back'>⟨</span>
            </li>
        );
    } else {
        listItems.push(
            <li key={-2}>
                <span
                    className='custom--pagination--back'
                    onClick={() => {
                        props.onClick(1);
                    }}
                >
                    ⟪
                </span>
            </li>
        );
        listItems.push(
            <li key={-1}>
                <span
                    className='custom--pagination--back'
                    onClick={() => {
                        props.onClick(PAGERDATA.PAGEINDEX - 1);
                    }}
                >
                    ⟨
                </span>
            </li>
        );
    }

    for (
        let i =
            PAGERDATA.TOTALPAGE > PAGERDATA.PAGERCOUNT &&
            PAGERDATA.PAGEINDEX > Math.ceil(PAGERDATA.PAGERCOUNT / 2)
                ? PAGERDATA.TOTALPAGE - 1 === PAGERDATA.PAGEINDEX ||
                  PAGERDATA.TOTALPAGE === PAGERDATA.PAGEINDEX
                    ? PAGERDATA.TOTALPAGE - (PAGERDATA.PAGERCOUNT - 1)
                    : PAGERDATA.PAGEINDEX + Math.floor(PAGERDATA.PAGERCOUNT / 2) >
                      PAGERDATA.TOTALPAGE
                    ? PAGERDATA.TOTALPAGE - PAGERDATA.PAGERCOUNT + 1
                    : PAGERDATA.PAGEINDEX - Math.floor(PAGERDATA.PAGERCOUNT / 2)
                : 1;
        i <=
        (PAGERDATA.TOTALPAGE > PAGERDATA.PAGERCOUNT
            ? PAGERDATA.TOTALPAGE > PAGERDATA.PAGERCOUNT &&
              PAGERDATA.PAGEINDEX > Math.ceil(PAGERDATA.PAGERCOUNT / 2)
                ? PAGERDATA.PAGEINDEX + Math.floor(PAGERDATA.PAGERCOUNT / 2) > PAGERDATA.TOTALPAGE
                    ? PAGERDATA.TOTALPAGE
                    : PAGERDATA.PAGEINDEX + Math.floor(PAGERDATA.PAGERCOUNT / 2)
                : PAGERDATA.PAGERCOUNT
            : PAGERDATA.TOTALPAGE);
        i++
    ) {
        const onclick = {};
        onclick['onClick'] =
            i == PAGERDATA.PAGEINDEX
                ? null
                : e => {
                      props.onClick(e.target.getAttribute('page'));
                  };

        listItems.push(
            <li key={i} className={i == PAGERDATA.PAGEINDEX ? 'active' : ''}>
                <span key={i} page={i} {...onclick}>
                    {i}
                </span>
            </li>
        );
    }

    if (PAGERDATA.TOTALPAGE === 0) {
        listItems.push(
            <li key={0} className={'active'}>
                <span>0</span>
            </li>
        );
        listItems.push(
            <li key={-3}>
                <span>⟩</span>
            </li>
        );
        listItems.push(
            <li key={-4}>
                <span>⟫</span>
            </li>
        );
    } else if (PAGERDATA.PAGEINDEX == PAGERDATA.TOTALPAGE) {
        listItems.push(
            <li key={-3}>
                <span className='custom--pagination--ahead'>⟩</span>
            </li>
        );
        listItems.push(
            <li key={-4}>
                <span className='custom--pagination--ahead'>⟫</span>
            </li>
        );
    } else {
        listItems.push(
            <li key={-3}>
                <span
                    className='custom--pagination--ahead'
                    onClick={() => {
                        props.onClick(PAGERDATA.PAGEINDEX + 1);
                    }}
                >
                    ⟩
                </span>
            </li>
        );
        listItems.push(
            <li key={-4}>
                <span
                    className='custom--pagination--ahead'
                    onClick={() => {
                        props.onClick(PAGERDATA.TOTALPAGE);
                    }}
                >
                    ⟫
                </span>
            </li>
        );
    }

    function fnFormatedNumber(number) {
        return number < 10 ? number : number;
    }

    return listItems;
};

export default CustomPagination;
