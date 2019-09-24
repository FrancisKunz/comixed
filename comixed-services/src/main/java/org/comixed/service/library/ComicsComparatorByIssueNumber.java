package org.comixed.service.library;

import org.comixed.model.library.Comic;

import java.util.Comparator;

/**
 * <code>COmicsComparatorByIssueNumber</code> is used when sorting a list of comcis by their issue numbers.
 *
 * @author Darryl L. Pierce
 */
public class ComicsComparatorByIssueNumber
        implements Comparator<Comic> {
    @Override
    public int compare(final Comic left,
                       final Comic right) {
        return left.getSortableIssueNumber()
                   .compareTo(right.getSortableIssueNumber());
    }
}
