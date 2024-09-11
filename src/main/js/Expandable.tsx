/*
 * Copyright (c) 2020 - present Cloudogu GmbH
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see https://www.gnu.org/licenses/.
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
