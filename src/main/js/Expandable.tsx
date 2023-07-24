/*
 * MIT License
 *
 * Copyright (c) 2020-present Cloudogu GmbH and Contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

//TODO Copied from Syntax.tsx in the core
//TODO Should probably become an independent component in the core, to make sure every expandable looks the same

import React, { FC, useState } from "react";
import { Icon } from "@scm-manager/ui-components";
import classNames from "classnames";

type ExpandableProps = {
  header: React.ReactNode;
  className?: string;
};

const Expandable: FC<ExpandableProps> = ({ header, children, className }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={classNames("card search-syntax-accordion", className)}>
      <header onClick={() => setExpanded(!expanded)} className="card-header is-clickable">
        <span className="card-header-title">{header}</span>
        <span className="card-header-icon">
          {expanded ? <Icon name="chevron-down" alt={"TODO"} /> : <Icon name="chevron-left" alt={"TODO"} />}
        </span>
      </header>
      {expanded ? <div className="card-content">{children}</div> : null}
    </div>
  );
};

export default Expandable;
