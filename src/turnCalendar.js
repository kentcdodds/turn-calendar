/**
 * @ngdoc directive
 * @name calendar
 * @restrict AE
 *
 * @description
 * An AngularJS directive that allows a calendar to be display when embedded.
 *
 * Allow the following options :
 *
 * @param {number} startingMonth - Optional. The STARTING month of the calendar,
 * if not specify will use the current month. January is count as 0, February is
 * 1, and so on.
 *
 * @param {number} startingYear - Optional. The STARTING year of the calendar,
 * if not specify will use the current year.
 *
 * @param {number} backwardMonths - The number of calendar instances of previous
 * months count from the STARTING month instance, notice the s. For example, if
 * the STARTING month is September, and you want to display July and August in your
 * calendar pop up, set backwardMonths=2. Maximum allowed value is 6. Minimum
 * allowed is 1. If you don't set anything or setting values not in allowed
 * range, there won't be any backward months to display (i.e default value is 0).
 *
 * @param {number} forwardMonths - The number of calendar instances of next
 * months count from the STARTING instance, notice the s at the end. For example:
 * STARTING month is September, and you want to display October and November, set
 * forwardMonths=2. Maximum allowed value is 6. Minimum allowed is 1. If you
 * don't set anything or setting values not in allowed range, there won't be
 * any forward months to display (i.e default value is 0).
 *
 * @param {number} startDayOfWeek - Allow the ability to set any day of the week
 * as the first day of week. Use 0 for Sunday, 1 for Monday, so on. Default is
 * 0.
 *
 * @param {string} minSelectDate - The minimum date which any dates which are
 * earlier than that date will not be able to be selected, accept a string in
 * MM-DD-YYYY or MM/DD/YYYY format.
 *
 * @param {string} maxSelectDate - The maximum date which any dates which are
 * later than that date will not be able to be selected, accept a string in
 * MM-DD-YYYY or MM/DD/YYYY format.
 *
 * @param {number} weeklySelectRange - A number in which if the hovered/selected
 * CURRENT date is beyond the LAST selected date, the mouse pointer will change
 * to WEEKLY hover/selected mode.
 *
 * @param {number} monthlySelectRange - A number in which if the hovered/selected
 * CURRENT date is beyond the LAST selected date, the mouse pointer will change
 * to MONTHLY hover/selected mode.
 *
 * @param {array} priorRangePresets - An array of object that specify the range
 * buttons to appear for user to select prior range from the CURRENT date. If
 * you want a pre-selected range add a property called isDefault: true. The
 * object MUST have a property called 'value' to display it. Value is a number.
 * The range will conform with minSelectDate, maxSelectDate, weeklySelectDate,
 * monthlySelectDate parameters if these parameters are set. If you currently
 * in a different month view, clicking on any of the prior button will reset
 * your current view back to the CURRENT month.
 *
 * @param {array} monthName - An array of string that will override the default
 * English month name, if you want to display the month in your language, if
 * not specify will display month in English abbreviation.
 *
 * @param {array} dayName - An array of string that will override the default
 * English day name, set this option if you want to display the day in your
 * language, if not specify will display the day in English abbreviation. The
 * array should begin with Sunday, ended with Saturday.
 *
 * @param {string} maxForwardMonth - Setting the max month which the NEXT button
 * allowed to work. Format is MM/YYYY. January starts as 0. This setting will
 * override the setting in forwardMonths. For example, you set the starting month
 * as August 2013, with forwardMonths is 3, maxForwardMonth is 10/2013, your
 * calendar will miss the month November 2013, because it exceeds the maxForwardMonth.
 *
 * @param {string} minBackwardMonth - Setting the min month which the PREVIOUS
 * button allowed to work. Format is MM/YYYY . January start as 0. This setting
 * will override the setting in backwardMonths. For example, you set the base
 * month to be March 2014, with backwardMonths to be 3. You also set minBackwardMonths
 * to be 1/2014. The calendar will not display January 2014, and Dec 2013, since
 * minBackwardMonths override backwardMonths. Attempt to press PREVIOUS button
 * won't work either.
 *
 * @param {string/number} startDate - Set the start date to be selected on the
 * calendar. Accept dateString or Unix timestamp. Set this as a directive attribute
 * if you want to be able to set this value in real time.
 *
 * @param {string|number} endDate - Set the end date to be selected on the calendar.
 * Accept dateString or Unix timestamp. Set this value as directive attribute if
 * you want to be able to set this value in real time.
 *
 * All of the above options can be set through a config object. Pass in the config
 * object through attribute calendarConfig. If you set the same config setting in
 * attribute and in config object, the value set in attribute will used over the
 * value in config object.
 *
 * @example
 *
 * <turn-calendar start-day-of-week="1" starting-month="11" starting-year="2013"
 *                forward-months="3" backward-months="3" min-select-date="'09/13/2013'"
 *                weekly-select-range="30" monthly-select-range="60"
 *                prior-range-presets="[{value: 20, isDefault: true}, {value: 45}, {value : 90}]"
 *                month-name="['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Bốn', 'Tháng Năm', 'Tháng Sáu',
 *                'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai']"
 *                day-name="['Chủ nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']"
 *                max-forward-month="'10/2014'">
 * <turn-calendar>
 *
 * The above code snippet will display 7 months instance, starting from Sep 2013
 * to March 2014, with Monday as the starting day of the week, the base month is
 * Dec 2013, it will change to weekly select mode if the cursor is 30 days beyond
 * the last selected date, monthly select mode if cursor is 60 days beyond the last
 * selected date. It will display 3 prior buttons: 20, 45, 90, with 25 is pre-selected
 * from the CURRENT date. Anything before 09/13/2013 is not available for selection.
 * It display the month name and day name in Vietnamese. Any month above Nov of the
 * year 2014 is not allowed.
 *
 * @author Tri Pham <tri.pham@turn.com>
 */
angular
    .module('turn/calendar', ['calendarTemplates'])
    .constant('turnCalendarDefaults', {

        /**
         * Default month name to display on calendar
         *
         * @type {array}
         */
        monthName : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

        /**
         * Default day name to display on calendar
         *
         * @type {array}
         */
        dayName: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        startingMonth: new Date().getMonth(),
        startingYear: new Date().getFullYear(),
        startDayOfWeek: 0
    })
    .controller('CalendarController', ['$scope' , '$attrs', 'turnCalendarDefaults', function ($scope, $attrs, turnCalendarDefaults) {

        var self = this, calendarOptions, MONTH_NAME;

        if ($attrs.calendarOptions) {
            calendarOptions = $scope.$parent.$eval($attrs.calendarOptions);
        }

        /**
         * Helper function to pick the value from either attribute or from config
         * object.
         *
         * @param {string} property The property to be read from attribute setting or
         * from a config object, if set in both attribute and config, the attribute
         * value will be use
         * @returns {*} The value
         */
        var pickValue = function (property) {

            if (angular.isDefined($attrs[property])) {
                return $scope.$parent.$eval($attrs[property]);
            }

            if (angular.isDefined(calendarOptions) && calendarOptions[property]) {
                return calendarOptions[property];
            }

            if (turnCalendarDefaults[property]) {
                return turnCalendarDefaults[property];
            }

            return null;

        };

        // Configuration attributes
        angular.forEach(['startingMonth', 'startingYear', 'backwardMonths', 'forwardMonths', 'startDayOfWeek', 'minSelectDate',
            'maxSelectDate', 'weeklySelectRange', 'monthlySelectRange', 'priorRangePresets', 'monthName', 'dayName',
             'maxForwardMonth', 'minForwardMonth', 'startDate', 'endDate'], function(key) {
            self[key] = pickValue(key);
        });

        /**
         * Constraint on maximum months allowed to display, either as forward
         * or backward
         *
         * @type {number}
         */
        const MAX_MONTH_ALLOWED = 6;

        /**
         * Constraint on minimum months allowed to display as extra forward or
         * backward
         *
         * @type {number}
         */
        const MIN_MONTH_ALLOWED = 1;

        /**
         * Maximum number of day to display on a calendar in month view
         *
         * @type {number}
         */
        const MAX_DAY = 42;

        /**
         * Number of day in a week
         *
         * @type {number}
         */
        const DAY_IN_WEEK = 7;

        /**
         * An array which will contains the month name with year to display on
         * the template
         *
         * @type {array}
         */
        $scope.monthNames = [];

        /**
         * An array which contains the name of day of week, to be displayed
         * by template
         *
         * @type {array}
         */
        $scope.dayNames = [];

        var dayRemained = self.dayName.splice(self.startDayOfWeek);
        $scope.dayNames = dayRemained.concat(self.dayName);

        if (self.monthName) {
            MONTH_NAME = self.monthName;
        }

        var isMonthValid = function (month) {
            return month && month >= MIN_MONTH_ALLOWED && month <= MAX_MONTH_ALLOWED;
        };

        /**
         * A helper function to determine how many day we should go back from the
         * first day of the month so that it fits the start day of week set by
         * user
         *
         * @param {number} startDayOfWeek Start day of week chosen by user
         * @param {number} firstDayOfMonth The day index of the week of the first
         * day of month
         * @returns {number} A number to indicate how many days we should go
         * backward from the first day of the month to fit in the week that has
         * an arbitrary start day
         */
        var generateFirstDateIndex = function (startDayOfWeek, firstDayOfMonth) {

            return 0 - (DAY_IN_WEEK - 1 - startDayOfWeek - (0 - firstDayOfMonth));
        };


        var convertToDateObject = function (monthValue) {

            var splitArray = monthValue.split('/');

            if (!splitArray.length) {
                return null;
            }

            var month = splitArray[0], year = splitArray[1];

            return new Date(year, month, 1);
        };

        var isExceedMaxMonth = function (month, year) {
            return self.maxForwardMonth &&
                convertToDateObject(self.maxForwardMonth) &&
                new Date(year, month, 1) > convertToDateObject(self.maxForwardMonth);
        };


        /**
         * Add the number of forward months into base month
         *
         * @param {array} monthArray - The current month array
         * @param {number} month - The month to be added
         * @param {year} year - The year of the month to be added
         */
        var setForwardMonths = function (monthArray, month, year) {

            if (!isMonthValid(self.forwardMonths)) {
                return;
            }

            var yearReset = false;

            for (var i = 1; i <= self.forwardMonths; i++) {

                var newMonth = month + i;

                // Bigger than 11 means moving to next year
                if (newMonth > 11) {
                    newMonth = newMonth % 12;

                    if (!yearReset) {
                        year = year + 1;
                        yearReset = true;
                    }
                }

                if (isExceedMaxMonth(newMonth, year)) {
                    return;
                }

                monthArray.push(generateDayArray(year, newMonth));
                $scope.monthNames.push(MONTH_NAME[newMonth] + ' ' + year);

            }

        };

        var isBelowMinMonth = function (month, year) {
            return self.minBackwardMonth &&
                   convertToDateObject(self.minBackwardMonth) &&
                   new Date(year, month, 1) < convertToDateObject(self.minBackwardMonth);
        };

        /**
         * Add the backward months into the base month
         *
         * @param {array} monthArray - The month array
         * @param {number} month - The month to be added
         * @param {number} year - The year to be added
         */
        var setBackwardMonths = function (monthArray, month, year) {

            if (!isMonthValid(self.backwardMonths)) {
                return;
            }

            var yearReset = false, newMonthCount = 0;

            for (var i = 1; i <= self.backwardMonths; i++) {

                var newMonth = month - i;

                // The year has been reset, use newMonthCount, not i
                if (yearReset) {
                    newMonth = month - newMonthCount;
                    newMonthCount++;
                }

                // Lower than 0 means moving backward to previous year
                if (newMonth < 0) {
                    month = newMonth = 11;
                    year = year - 1;
                    yearReset = true;
                    newMonthCount++;
                }

                if (isBelowMinMonth(newMonth, year)) {
                    return;
                }

                monthArray.unshift(generateDayArray(year, newMonth));
                $scope.monthNames.unshift(MONTH_NAME[newMonth] + ' ' + year);
            }

        };

        /**
         * Function to generate an array that contains several months per specify
         * by the config from user. By default the year and month will be set
         * according to config values. If there is an input year and an input
         * month from internal calls the year and month setting from config will
         * be overridden
         *
         * @param {number} inputYear - Input year as base year
         * @param {number} inputMonth - Input month as base month
         * @returns {array} The array that contains
         */
        var generateMonthArray = function (inputYear, inputMonth) {
            var year = self.startingYear,
                month = self.startingMonth;

            if (inputYear) {
                year = inputYear;
            }

            if (inputMonth) {
                month = inputMonth;
            }

            var baseMonth = generateDayArray(year, month),
                monthArray = [];

            monthArray.push(baseMonth);

            // Reset the month names
            $scope.monthNames = [];
            $scope.monthNames.push(MONTH_NAME[month] + ' ' + year);

            setForwardMonths(monthArray, month, year);

            setBackwardMonths(monthArray, month, year);

            return monthArray;

        };

        /**
         * Function to determine the first day of the 42 day to be shown on a
         * month view calendar.
         *
         * @param {number} year - The year in question
         * @param {number} month - The month in question
         * @returns {object} Javascript date object of the first date to be shown
         */
        var getFirstDate = function (year, month) {

            var firstDayOfMonth = new Date(year, month, 1),
                dayOfWeek = firstDayOfMonth.getDay(),
                firstDate;

            firstDate = new Date(firstDayOfMonth.setDate(generateFirstDateIndex(self.startDayOfWeek, dayOfWeek)));

            return firstDate;

        };

        /**
         * An utility function to split a big array into small chunks of a fixed
         * size.
         *
         * @param {array} array - The array to be split
         * @param {number} size - The fix size to be split into
         * @returns {array} An array of fixed size array
         */
        var arraySplit = function (array, size) {
            var arrays = [];
            while (array.length > 0) {
                arrays.push(array.splice(0, size));
            }
            return arrays;
        };

        /**
         * Function to generate the full 42 day to be shown on the calendar
         *
         * @param {number} year - The year to be shown
         * @param {number} month - The month to be shown
         * @returns {array} A 2 dimension array contains the weeks to be shown
         */
        var generateDayArray = function (year, month) {

            var currentDate = new Date(getFirstDate(year, month)),
                dayArray = [];

            for (var i = 0; i < MAX_DAY; i++) {
                dayArray.push(generateMetaDateObject(new Date(currentDate), month));
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return arraySplit(dayArray, DAY_IN_WEEK);
        };


        /**
         * Detect if the date in question compatible with minSelectDate
         * or maxSelectDate
         *
         * @param {object} date - The date in question
         * @returns {boolean} - True if compatible, false if not
         */
        var isUnavailable = function (date) {
            return (self.minSelectDate && date <= new Date(self.minSelectDate)) ||
                   (self.maxSelectDate && date >= new Date(self.maxSelectDate));
        };


        /**
         * Function that determine if the current day is within the selected
         * range, either weekly select range or monthly select range
         *
         * @param {number} selectRange - The range to determine whether the
         * day is falling within
         * @param {number} compareRange - An optional second range, to determine
         * if the day is sandwiched between two range or not
         * @param {object} baseDay - The base day which we compare against
         * @param {object} day - The day in question
         * @returns {boolean} True if exceeds or is between the two range, false
         * if not
         */
        var isDateWithinSelectedRange = function (selectRange, compareRange, baseDay, day) {

            if (!selectRange || !day || day.isUnavailable || !lastSelectedDate) {
                return false;
            }

            var selectDateForward = new Date(baseDay.date.toLocaleDateString()),
                selectDateBackward = new Date(baseDay.date.toLocaleDateString());

            selectDateForward.setDate(selectDateForward.getDate() + selectRange);
            selectDateBackward.setDate(selectDateBackward.getDate() - selectRange);

            if (compareRange) {

                var compareRangeForward = new Date(lastSelectedDate.date.toLocaleDateString()),
                    compareRangeBackward = new Date(lastSelectedDate.date.toLocaleDateString());

                compareRangeForward.setDate(compareRangeForward.getDate() + compareRange);
                compareRangeBackward.setDate(compareRangeBackward.getDate() - compareRange);

                if (compareRange > selectRange) {
                    return (day.date > selectDateForward && day.date < compareRangeForward) ||
                        (day.date > compareRangeBackward && day.date < selectDateBackward);
                }

            }

            return day.date > selectDateForward || day.date < selectDateBackward;
        };

        var setWeekValue = function (week, isHover, hoverValue, selectMode) {

            week.forEach(function (day) {

                if (!day.date || day.isUnavailable) {
                    return;
                }

                if (isHover) {
                    day.isHover = hoverValue;
                    return;
                }

                day.selectMode = selectMode;

            });
        };

        var setMonthValue = function (month, isHover, hoverValue, selectMode) {
            month.forEach(function (week) {
                setWeekValue(week, isHover, hoverValue, selectMode);
            });
        };

        /**
         * Set the hover value or selected value of the day in question through
         * the month that contains the day in question
         *
         * @param {object} selectedDay - The day in question
         * @param {boolean} isHover - Whether this is a hover or selection
         * @param {boolean} hoverValue - True if hovered, false if not
         * @param {string} selectMode - The current select mode
         */
        var paletteTheMonth = function (selectedDay, isHover, hoverValue, selectMode) {

            $scope.monthArray.some(function (month) {

                var monthFound = month.some(function (week) {
                    return week.some(function (day) {
                        return day && day.date && day.date.toLocaleDateString() === selectedDay.date.toLocaleDateString();
                    })
                });

                if (monthFound) {
                    setMonthValue(month, isHover, hoverValue, selectMode);
                }

                return monthFound;

            });

        };

        /**
         * Set the hover value or selected value of the day in question through
         * the week that contains the day
         *
         * @param {object} selectedDay - The day in question
         * @param {boolean} isHover - Whether this is a hover or selection
         * @param {boolean} hoverValue - True if hovered, false if not
         * @param {string} selectMode - The current select mode
         */
        var paletteTheWeek = function (selectedDay, isHover, hoverValue, selectMode) {

            $scope.monthArray.some(function (month) {

                var weekFound = false;

                month.some(function (week) {

                    weekFound = week.some(function (day) {
                        return day && day.date && day.date.toLocaleDateString() === selectedDay.date.toLocaleDateString();
                    });

                    if (weekFound) {
                        setWeekValue(week, isHover, hoverValue, selectMode);
                    }

                    return weekFound;
                });

                return weekFound;

            });
        };


        /**
         * Function to determine whether to hover the cell or not
         *
         * @param {object} day - The day in question
         */
        $scope.mouseEnter = function (day) {

            if (!day.date || day.isUnavailable) {
                day.isHover = false;
                return;
            }

            if (!$scope.selectedStartDate) {
                day.isHover = true;
                return;
            }

            if (isDateWithinSelectedRange(self.weeklySelectRange, self.monthlySelectRange, lastSelectedDate, day)) {
                paletteTheWeek(day, true, true, '');
                return;
            }

            if (isDateWithinSelectedRange(self.monthlySelectRange, self.weeklySelectRange, lastSelectedDate, day)) {
                paletteTheMonth(day, true, true, '');
                return;
            }

            if (!day.isUnavailable) {
                day.isHover = true;
            }

        };

        /**
         * Function to determine if to remove the hover of the current day
         *
         * @param {object} day - The day in question
         */
        $scope.mouseLeave = function (day) {

            if (!$scope.selectedStartDate) {
                day.isHover = false;
                return;
            }

            if (isDateWithinSelectedRange(self.weeklySelectRange, self.monthlySelectRange, lastSelectedDate, day)) {
                paletteTheWeek(day, true, false, '');
                return;
            }

            if (isDateWithinSelectedRange(self.monthlySelectRange, self.weeklySelectRange, lastSelectedDate, day)) {
                paletteTheMonth(day, true, false, '');
                return;
            }

            day.isHover = false;
        };

        /**
         * A meta date object that wrap around a plain Javascript date object,
         * it keeps several attributes to keep track of information about the
         * date in question
         *
         * selectedMode : cursor select mode, whether the current mode is 'daily',
         * 'weekly', or 'monthly'
         *
         * isHover: whether if the current date is being hovered, or being selected
         *
         * isUnavailable: the date is not available for hovering or selection
         *
         * @param {object} date - Plain Javascript date object
         * @param {number} currentMonth - If the month of date does not match
         * current month, return an empty object
         * @returns {object} A meta date object
         */
        var generateMetaDateObject = function (date, currentMonth) {

            // If the month does not match, return empty object
            if (date.getMonth() !== currentMonth) {
                return {};
            }

            return {
                date: date,
                selectMode: '',
                isHover: false,
                isUnavailable: isUnavailable(date)
            };
        };

        var isDaily = function () {
            return (!self.weeklySelectRange && !self.monthlySelectRange) ||
                   (!isDateWithinSelectedRange(self.weeklySelectRange, self.monthlySelectRange, $scope.selectedStartDate, $scope.selectedEndDate) &&
                    !isDateWithinSelectedRange(self.weeklySelectRange, self.monthlySelectRange, $scope.selectedStartDate, $scope.selectedEndDate));
        };

        /**
         * Determine if the date is between selected start date and end date
         *
         * @param {object} date - The date in question
         * @returns {boolean} True if between, false if not
         */
        var isBetweenStartAndEndDate = function (date) {
            return date <= $scope.selectedEndDate.date && date >= $scope.selectedStartDate.date;
        };

        /**
         * Go through all the dates to turn on the selected class if the date
         * fall in between selected start date and selected end date
         */
        var colorSelectedDateRange = function () {

            $scope.monthArray.forEach(function (month) {

                month.forEach(function (week) {

                    week.forEach(function (day) {

                        if (day && day.date && isBetweenStartAndEndDate(day.date)) {

                            if (isDaily()) {
                                day.selectMode = 'daily';
                            }

                            if (isDateWithinSelectedRange(self.weeklySelectRange, self.monthlySelectRange, $scope.selectedStartDate, $scope.selectedEndDate)) {
                                day.selectMode = 'weekly';
                            }

                            if (isDateWithinSelectedRange(self.monthlySelectRange, self.weeklySelectRange, $scope.selectedStartDate, $scope.selectedEndDate)) {
                                day.selectMode = 'monthly';
                            }

                        }
                    });

                });
            });

            // Color the entire end week, not just the selected end date
            if (isDateWithinSelectedRange(self.weeklySelectRange, self.monthlySelectRange, $scope.selectedStartDate, $scope.selectedEndDate)) {

                paletteTheWeek($scope.selectedStartDate, false, false, 'weekly');
                paletteTheWeek($scope.selectedEndDate, false, false, 'weekly');
            }

            // Color the entire month, not just the selected end date
            if (isDateWithinSelectedRange(self.monthlySelectRange, self.weeklySelectRange, $scope.selectedStartDate, $scope.selectedEndDate)) {

                paletteTheMonth($scope.selectedStartDate, false, false, 'monthly');
                paletteTheMonth($scope.selectedEndDate, false, false, 'monthly');
            }
        };

        /**
         * Remove all selected dates
         */
        var discolorSelectedDateRange = function () {
            $scope.monthArray.forEach(function (month) {
                month.forEach(function (week) {
                    week.forEach(function (day) {
                        if (day && day.selectMode) {
                            day.selectMode = '';
                            day.isHover = false;
                        }
                    });
                });
            });
        };

        var isBothSelected = function () {
            return $scope.selectedStartDate && $scope.selectedEndDate;
        };

        var isNoneSelected = function () {
            return !$scope.selectedStartDate && !$scope.selectedEndDate;
        };

        var isStartDateSelected = function () {
            return $scope.selectedStartDate && !$scope.selectedEndDate;
        };

        var setEndDate = function (day) {

            if (day.date < $scope.selectedStartDate.date) {
                $scope.selectedEndDate = $scope.selectedStartDate;
                $scope.selectedStartDate = day;
            } else if (day.date > $scope.selectedStartDate.date) {
                $scope.selectedEndDate = day;
            }

            $scope.startDateString = $scope.selectedStartDate.date.toLocaleDateString();
            $scope.endDateString = $scope.selectedEndDate.date.toLocaleDateString();

            colorSelectedDateRange();

        };

        var setStartDate = function (day) {

            $scope.selectedStartDate = day;
            $scope.startDateString = $scope.selectedStartDate.date.toLocaleDateString();
            day.selectMode = 'daily';

        };

        var lastSelectedDate = null;

        var swapDate = function () {

            if ($scope.selectedEndDate.date < $scope.selectedStartDate.date) {
                var tempDay = $scope.selectedStartDate;
                $scope.selectedStartDate = $scope.selectedEndDate;
                $scope.selectedEndDate = tempDay;
            }
        };

        var resetDayClick = function (day) {

            if (!lastSelectedDate) {
                lastSelectedDate = $scope.selectedEndDate;
            }

            if ($scope.selectedStartDate.date == lastSelectedDate.date) {
                $scope.selectedEndDate = day;
            } else if ($scope.selectedEndDate.date == lastSelectedDate.date) {
                $scope.selectedStartDate = day;
            }

            swapDate();
            $scope.startDateString = $scope.selectedStartDate.date.toLocaleDateString();
            $scope.endDateString = $scope.selectedEndDate.date.toLocaleDateString();

            discolorSelectedDateRange();

            colorSelectedDateRange();

            lastSelectedDate = day;
        };

        /**
         * Function to execute to determine whether to set start date, end date,
         * or reset the calendar
         *
         * @param {object} day - A meta date object
         */
        $scope.setDayClick = function (day) {

            if (day.isUnavailable || !day.date) {
                return;
            }

            if (isNoneSelected()) {

                setStartDate(day);

            } else if (isStartDateSelected()) {

                setEndDate(day);

            } else if (isBothSelected()) {

                resetDayClick(day);

            }

        };

        $scope.monthArray = generateMonthArray(null, null);

        // Allow to show the calendar or hide it
        $scope.calendarEnabled = false;

        /**
         * Function to show the calendar or hide it
         */
        $scope.enableCalendar = function () {
            $scope.calendarEnabled = !$scope.calendarEnabled;
        };

        $scope.applyCalendar = function () {
            $scope.currentSelectedStartDate = $scope.selectedStartDate;
            $scope.currentSelectedEndDate = $scope.selectedEndDate;
            $scope.calendarEnabled = false;
        };

        $scope.cancel = function () {
            discolorSelectedDateRange();
            $scope.selectedStartDate = $scope.currentSelectedStartDate;
            $scope.selectedEndDate = $scope.currentSelectedEndDate;

            /**
             * Edge case, if the current selected start date is empty, then it
             * means the selected end date should be null too
             */
            if (!$scope.currentSelectedStartDate) {
                $scope.selectedEndDate = null;
            }

            if ($scope.selectedStartDate && $scope.selectedEndDate) {
                colorSelectedDateRange();
            }

            $scope.calendarEnabled = false;
        };


        /**
         * Function that add a new month into the month array, remove the last
         * month at the same time
         */
        $scope.nextMonth = function () {

            var lastMonth = $scope.monthArray[$scope.monthArray.length - 1],
                middleWeek = lastMonth[2],
                middleDateOfMonth = middleWeek[6],
                year = middleDateOfMonth.date.getFullYear(),
                month = middleDateOfMonth.date.getMonth(),
                newMonth = month + 1;

            if (isExceedMaxMonth(newMonth, year)) {
                return;
            }

            // Bigger than 11 means moving to next year
            if (newMonth > 11) {
                newMonth = newMonth % 12;
                year = year + 1;
            }

            var newMonthArray = generateDayArray(year, newMonth),
                allowedArraySize = 1;

            if (self.forwardMonths) {
                allowedArraySize += self.forwardMonths;
            }

            if (self.backwardMonths) {
                allowedArraySize += self.backwardMonths;
            }

            /**
             * This check if the current monthArray is equal to the maximum length
             * allowed by backwardMonths and forwardMonths setting. If it reaches
             * maximum then remove the last month.
             */
            if (allowedArraySize === $scope.monthArray.length) {
                $scope.monthArray.shift();
                $scope.monthNames.shift();
            }

            $scope.monthArray.push(newMonthArray);
            $scope.monthNames.push(MONTH_NAME[newMonth] + ' ' + year);

            discolorSelectedDateRange();

            // Remember to color current selected start and end dates
            if ($scope.selectedStartDate && $scope.selectedEndDate) {
                colorSelectedDateRange();
            }

        };

        /**
         * Function that add a new month to the month array. The month is the
         * previous month of the lowest month in the array.
         */
        $scope.previousMonth = function () {

            var firstMonth = $scope.monthArray[0],
                middleWeek = firstMonth[2],
                middleDateOfMonth = middleWeek[6],
                year = middleDateOfMonth.date.getFullYear(),
                month = middleDateOfMonth.date.getMonth(),
                newMonth = month - 1;

            if (isBelowMinMonth(newMonth, year)) {
                return;
            }

            // Lower than 0 means moving backward to previous year
            if (newMonth < 0) {
                newMonth = 11;
                year = year - 1;
            }

            var newMonthArray = generateDayArray(year, newMonth),
                allowedArraySize = 1;

            if (self.forwardMonths) {
                allowedArraySize += self.forwardMonths;
            }

            if (self.backwardMonths) {
                allowedArraySize += self.backwardMonths;
            }

            /**
             * This check if the current monthArray is equal to the maximum length
             * allowed by backwardMonths and forwardMonths setting. If it reaches
             * maximum then remove the first month.
             */
            if (allowedArraySize === $scope.monthArray.length) {
                $scope.monthArray.pop();
                $scope.monthNames.pop();
            }

            $scope.monthArray.unshift(newMonthArray);
            $scope.monthNames.unshift(MONTH_NAME[newMonth] + ' ' + year);

            discolorSelectedDateRange();

            if ($scope.selectedStartDate && $scope.selectedEndDate) {
                colorSelectedDateRange();
            }
        };


        $scope.selectedStartDate = null;
        $scope.selectedEndDate = null;
        $scope.currentSelectedStartDate = null;
        var currentDate = new Date();
        $scope.currentSelectedEndDate = generateMetaDateObject(currentDate, currentDate.getMonth());

        $scope.priorButtons = null;

        /**
         * Function to allow the prior buttons to set the end date by using a
         * range from the current date
         *
         * @param {object} range - A range object to be set
         */
        $scope.selectRange = function (range) {

            discolorSelectedDateRange();

            var startDate = new Date(),
                endDate = new Date();

            $scope.monthArray = generateMonthArray(endDate.getFullYear(), endDate.getMonth());

            startDate.setDate(startDate.getDate() - range.value);
            var startDay = generateMetaDateObject(startDate, startDate.getMonth());

            /**
             * If endDate is unavailable, going forward 1 day till seeing one
             * that is available
             */
            while (startDay.isUnavailable) {
                startDate.setDate(startDate.getDate() + 1);
                startDay = generateMetaDateObject(startDate, startDate.getMonth());
            }

            setStartDate(startDay);

            var endDay = generateMetaDateObject(endDate, endDate.getMonth());

            /**
             * If startDate is unavailable, going backward 1 day till seeing one
             * that is available
             */
            while (endDay.isUnavailable) {
                endDate.setDate(endDate.getDate() - 1);
                endDay = generateMetaDateObject(endDate, endDate.getMonth());
            }

            lastSelectedDate = $scope.selectedStartDate;

            setEndDate(endDay);


        };

        /**
         * Function to set the default selection if the user specify a default
         * prior button
         */
        var setDefaultRange = function () {

            var defaultRange = null;

            $scope.priorButtons = self.priorRangePresets;

            for (var i = 0; i < $scope.priorButtons.length; i++) {

                var priorRange = $scope.priorButtons[i];

                if (priorRange.isDefault) {
                    defaultRange = priorRange;
                    break;
                }
            }

            if (!defaultRange) {
                return;
            }

            $scope.selectRange(defaultRange);

            $scope.currentSelectedEndDate = $scope.selectedEndDate;
            $scope.currentSelectedStartDate = $scope.selectedStartDate;
        };


        if (self.priorRangePresets) {
            setDefaultRange();
        }

        if ($scope.selectedStartDate) {
            $scope.startDateString = $scope.selectedStartDate.date.toLocaleDateString();
        }

        if ($scope.selectedEndDate) {
            $scope.endDateString = $scope.selectedEndDate.date.toLocaleDateString();
        }

        /**
         * Change start date when ng-change detects the user changing the start
         * date
         *
         * @param {object} day - Meta date object
         */
        var setStartDateString = function (day) {

            if (day.isUnavailable) {
                return;
            }

            discolorSelectedDateRange();


            var middleDateFirstMonth = $scope.monthArray[0][2][6],
                firstDateFirstMonth = new Date(middleDateFirstMonth.date.getFullYear(), middleDateFirstMonth.date.getMonth(), 1);

            if (day.date < firstDateFirstMonth) {
                $scope.monthArray = generateMonthArray(day.date.getFullYear(), day.date.getMonth());
            }

            setStartDate(day);

            $scope.endDate = day.date.toLocaleDateString();

            if ($scope.selectedEndDate && $scope.selectedEndDate.date > day.date) {
                colorSelectedDateRange();
            }
        };

        /**
         * Helper function to validate date input, be it a string or a number
         *
         * @param {string|number} date Date input
         * @returns {boolean} True if valid, false if not
         */
        var validateDateInput = function (date) {

            var dateObj = new Date(date);

            if ( Object.prototype.toString.call(dateObj) !== "[object Date]" )
                return false;
            return !isNaN(dateObj.getTime());
        };

        /**
         * Invoke by ng-change when user input start date string
         */
        $scope.changeStartDate = function () {

            if (!validateDateInput($scope.startDateString)) {
                return;
            }

            var newDate = new Date($scope.startDateString);

            setStartDateString(generateMetaDateObject(newDate, newDate.getMonth()));
        };

        /**
         * Change the end date, provoke by ng-change
         *
         * @param {object} day - The meta end date object
         */
        var setEndDateString = function (day) {

            if (day.isUnavailable) {
                return;
            }

            if ($scope.selectedStartDate && $scope.selectedStartDate.date > day.date) {
                return;
            }

            $scope.selectedEndDate = day;
            $scope.endDate = day.date.toLocaleDateString();


            discolorSelectedDateRange();
            colorSelectedDateRange();

        };

        /**
         * Invoke by ng-change when user invoke changes to end date string
         */
        $scope.changeEndDate = function () {

            if (!validateDateInput($scope.endDateString)) {
                return;
            }

            var newDate = new Date($scope.endDateString);

            setEndDateString(generateMetaDateObject(newDate, newDate.getMonth()));
        };

        $scope.$watch('startDate', function (newVal) {

            if (!validateDateInput(newVal)) {
                return;
            }

            var newStartDate = new Date(newVal);
            $scope.selectedStartDate = generateMetaDateObject(newStartDate, newStartDate.getMonth());
            $scope.startDateString = $scope.selectedStartDate.toLocaleDateString();

            if ($scope.selectedEndDate) {
                discolorSelectedDateRange();
                colorSelectedDateRange();
            }

        });

        $scope.$watch('endDate', function (newVal) {

            if (!validateDateInput(newVal)) {
                return;
            }

            var newEndDate = new Date(newVal);

            $scope.selectedEndDate = generateMetaDateObject(newEndDate, newEndDate.getMonth());
            $scope.endDateString = $scope.selectedEndDate.date.toLocaleDateString();

            if ($scope.selectedStartDate) {
                discolorSelectedDateRange();
                colorSelectedDateRange();
            }

        });

    }])
    .directive('turnCalendar', function () {

        return {
            restrict: 'AE',
            scope: {
                startingMonth: '=',
                startingYear: '=',
                backwardMonths: '=',
                forwardMonths: '=',
                startDayOfWeek: '=',
                weeklySelectRange: '=',
                monthlySelectRange: '=',
                minSelectDate: '=',
                maxSelectDate: '=',
                priorRangePresets: '&',
                monthName: '&',
                dayName: '&',
                maxForwardMonth: '=',
                minBackwardMonth: '=',
                startDate: '=',
                endDate: '='
            },
            controller: 'CalendarController',
            templateUrl: 'turnCalendar.html'
        };

    });