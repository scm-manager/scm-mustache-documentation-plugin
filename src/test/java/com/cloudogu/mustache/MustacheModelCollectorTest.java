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

import com.google.common.collect.ImmutableSet;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class MustacheModelCollectorTest {

  private MustacheModelCollector collector;

  @Test
  void shouldReturnEmptyListIfNoProviders() {
    collector = new MustacheModelCollector(Set.of());
    Map<String, List<String>> result = collector.getModels();

    assertThat(result).hasSize(0);
  }

  @Test
  void shouldGetModelFromProvider() {
    collector = new MustacheModelCollector(ImmutableSet.of(new TestProvider()));
    Map<String, List<String>> result = collector.getModels();

    assertThat(result).hasSize(1);
    assertThat(result.get("TestModel")).containsOnly("TestProp1", "PropTest2");
  }

  static class TestProvider implements MustacheModelProvider {

    @Override
    public List<String> getModel() {
      return List.of("TestProp1", "PropTest2");
    }

    @Override
    public String getName() {
      return "TestModel";
    }
  }
}
