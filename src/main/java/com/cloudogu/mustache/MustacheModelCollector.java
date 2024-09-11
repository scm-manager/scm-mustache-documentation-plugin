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

package com.cloudogu.mustache;

import jakarta.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

class MustacheModelCollector {

  private final Set<MustacheModelProvider> mustacheModelProviderSet;

  @Inject
  MustacheModelCollector(Set<MustacheModelProvider> mustacheModelProviderSet) {
    this.mustacheModelProviderSet = mustacheModelProviderSet;
  }

  Map<String, List<String>> getModels() {
    Map<String, List<String>> models = new HashMap<>();

    mustacheModelProviderSet.forEach(provider -> models.put(provider.getName(), provider.getModel()));

    return models;
  }
}
