/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2019, The ComiXed Project
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.package
 * org.comixed;
 */

package org.comixed.plugins;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * <code>PluginContainer</code> loads and then executes instances of {@link PluginRunner}.
 *
 * @author Darryl L. Pierce
 */
@Component
public class PluginContainer {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired private ObjectFactory<PythonPluginRunner> pythonRunnerFactory;

    public void executePlugin(String reference) {
        this.logger.info("Preparing to run plugin: reference={}",
                         reference);

        this.logger.debug("Getting Jython runtime environment");
        final PythonPluginRunner runner = this.pythonRunnerFactory.getObject();

        this.logger.debug("Firing dynamic language.");
        runner.execute("print(\"Hello World\")");

        this.logger.debug("Cleaning up");
    }
}
