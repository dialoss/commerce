//@ts-nocheck
import React from 'react';
import "./CommentsTools.scss";

const CommentsTools = ({callback}) => {
    return (
        <div className={"comments-tools"}>
            <p>Сортировка</p>
            <div className={"sort-options"}>
                <select name="sort" id="" onChange={callback} defaultValue={'default'}>
                    <option value="default">По умолчанию</option>
                    {/*<option value="controversial">Обсуждаемые</option>*/}
                    <option value="oldest">Старые</option>
                    <option value="newest">Новые</option>
                    {/*<option value="best">Лучшие</option>*/}
                </select>
            </div>
        </div>
    );
};

export default CommentsTools;