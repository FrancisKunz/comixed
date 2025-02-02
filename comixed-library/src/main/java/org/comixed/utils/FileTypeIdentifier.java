/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2017, The ComiXed Project
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

package org.comixed.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import org.apache.tika.Tika;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.mime.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * <code>FileTypeIdentifier</code> identifies the mime type for a file or file
 * entry.
 *
 * @author Darryl L. Pierce
 *
 */
@Component
public class FileTypeIdentifier
{
    public static final List<String> IMAGE_TYPES = Arrays.asList(new String[]
    {"jpeg",
     "png",
     "gif"});

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private Tika tika;
    @Autowired
    private Metadata metadata;

    private MediaType getMimeType(InputStream input)
    {
        this.logger.debug("Attempting to detect mime type for stream");
        MediaType result = null;

        try
        {
            input.mark(Integer.MAX_VALUE);
            result = this.tika.getDetector().detect(input, this.metadata);
            input.reset();
        }
        catch (IOException error)
        {
            this.logger.error("Error determining filetype from stream", error);
        }

        this.logger.debug("result=" + result);

        return result;
    }

    /**
     * Returns the MIME subtype for the supplied input stream.
     *
     * @param input
     *            the input stream, which must support
     *            {@link InputStream#mark(int)} and {@link InputStream#reset()}
     * @return the MIME subtype
     */
    public String subtypeFor(InputStream input)
    {
        MediaType result = this.getMimeType(input);

        return result != null ? result.getSubtype() : null;
    }

    /**
     * Returns the MIME type for the supplied input stream.
     *
     * @param input
     *            the input stream, which must support
     *            {@link InputStream#mark(int)} and {@link InputStream#reset()}
     * @return the MIME type
     */
    public String typeFor(InputStream input)
    {
        MediaType result = this.getMimeType(input);

        return result != null ? result.getType() : null;
    }
}
